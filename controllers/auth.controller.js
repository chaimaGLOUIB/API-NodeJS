const { OAuth2Client } = require("google-auth-library");
var jwt = require('jsonwebtoken');
const request = require('superagent');
const request1 = require('request');

const User = require("../models/user.model");

const client = new OAuth2Client("157224789203-n554b4i9j3g183e59ka9qjvdkrbo9ida.apps.googleusercontent.com")
const fetch = require('node-fetch');
const { response } = require("express");

exports.googlelogin = (req, res) => {
    const { tokenId } = req.body;
    client.verifyIdToken({ idToken: tokenId, audience: "157224789203-n554b4i9j3g183e59ka9qjvdkrbo9ida.apps.googleusercontent.com" }).then(response => {
        const { email_verified, name, email } = response.getPayload();
        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Something went wrong"
                    })
                } else {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY);

                        User.updateOne({
                            _id: user._id
                        }, {
                            $set: { token: token,isAuthenticated:true }
                        }, function (err, res) {
                            if (err) throw err;
                            console.log("token generated");
                        })
                    } else {
                        let password = email + process.env.JWT_SIGNIN_KEY;
                        let newUser = new User({ displayName: name, email: email, password: password, token: '',isAuthenticated:true });

                        newUser.save()
                            .then(newUser => {
                                console.log(newUser)
                                const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SIGNIN_KEY)
                                User.updateOne({
                                    _id: newUser._id
                                }, {
                                    $set: { token: token }
                                }, function (err, res) {
                                    if (err) throw err;
                                    console.log("token generated");
                                })


                            })
                            .catch(err => {
                                res.status(400).send('adding new user failed');
                            });


                    }
                }
            })
        }
    })
}

exports.facebooklogin = (req, res) => {
    const { userID, accessToken } = req.body;
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
    fetch(urlGraphFacebook, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(response => {
            const { email, name } = response;
            User.findOne({ email }).exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Something went wrong"
                    })
                } else {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGNIN_KEY);

                        User.updateOne({
                            _id: user._id
                        }, {
                            $set: { token: token,isAuthenticated:true }
                        }, function (err, res) {
                            if (err) throw err;
                            console.log("token generated");
                        })
                    } else {
                        let password = email + process.env.JWT_SIGNIN_KEY;
                        let newUser = new User({ displayName: name, email: email, password: password, token: '',isAuthenticated:true });
                        newUser.save()
                            .then(newUser => {
                                console.log(newUser)
                                const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SIGNIN_KEY)
                                User.updateOne({
                                    _id: newUser._id
                                }, {
                                    $set: { token: token}
                                }, function (err, res) {
                                    if (err) throw err;
                                    console.log("token generated");
                                })


                            })
                            .catch(err => {
                                res.status(400).send('adding new user failed');
                            });
                    }
                }
            });

        });
}
exports.linkedinlogin = (req, res, next) => {


    let localizedFirstName;
    let localizedLastName;
    let profilePicture;
    let email;
    const { code } = req.body.code;
    request.post('https://www.linkedin.com/oauth/v2/accessToken')
        .send('grant_type=authorization_code')
        .send(`code=${code}`)
        .send(`redirect_uri=${process.env.REDIRECT_URI}`)
        .send(`client_id=${process.env.CLIENT_ID}`)
        .send(`client_secret=${process.env.CLIENT_SECRET}`)
        .then(response => {
            const token = response.body.access_token;
            request.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))')
                .set('Authorization', `Bearer ${token}`).then(response => {
                    localizedFirstName = response.body.localizedFirstName;
                    localizedLastName = response.body.localizedLastName;
                    Name = [localizedFirstName, localizedLastName].join(' ')
                    profilePicture = response.body.profilePicture;
                    request1.get({ url: "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))", headers: { "Authorization": "Bearer " + token } }, function (err, res, responseBody) {
                        if (err) {
                            console.log(err)
                        }
                        else {

                            const email = JSON.parse(responseBody).elements[0]["handle~"].emailAddress
                            User.findOne({ email }).exec((err, user) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: "Something went wrong"
                                    })
                                } else {
                                    if (user) {
                                        console.log(user)
                                        User.updateOne({
                                            _id: user._id
                                        }, {
                                            $set: { token: token ,isAuthenticated:true }
                                        }, function (err, res) {
                                            if (err) throw err;
                                            console.log("token generated");
                                        })
                                    } else {
                                        let password = email + process.env.JWT_SIGNIN_KEY;
                                        let newUser = new User({ displayName: Name, email: email, password: password, token: token ,isAuthenticated:true});
                                        newUser.save()
                                            .then(newUser => {
                                                console.log(newUser)



                                            })
                                            .catch(err => {
                                                console.log('error')
                                            });
                                    }
                                }
                            });



                        }

                    })
                })
        })
        .catch((error) => {
            res.status(500).send(`${error}`)
            console.error(error)
        })


}











exports.microsoftlogin = (req, res) => {
    const { displayName, userPrincipalName } = req.body.user;
    const accessToken=req.body.accessToken
    const email=userPrincipalName
    console.log(displayName)
    console.log(accessToken)
    User.findOne({ email }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Something went wrong"
            })
        } else {
            if (user) {
                console.log('deja')
                User.updateOne({
                    _id: user._id
                }, {
                    $set: { token: accessToken ,isAuthenticated:true}
                }, function (err, res) {
                    if (err) throw err;
                    console.log("token generated");
                }) .then(user => {
                    console.log(user)


                })
            } else {
                let password = userPrincipalName+ process.env.JWT_SIGNIN_KEY;
                let newUser = new User({ displayName: displayName, email: userPrincipalName, password:password ,token: accessToken ,isAuthenticated:true});
                newUser.save()
                    .then(newUser => {

                    console.log(newUser)

                    })
                    .catch(err => {
                        console.log('error')
                    });
            }
        }
    });


}
exports.isAuthenticated = function(req, res) {
const email=req.body.userPrincipalName;
console.log('email');

    User.findOne({ email }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Something went wrong"
            })
        } else {
            if (user) {
                res.send(user.isAuthenticated)
            }
           

        }

    })

}
exports.logout = function(req, res) {
    const email=req.body.userPrincipalName;
console.log(email);
    User.findOne({ email }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Something went wrong"
            })
        } else {
           
                if (user) {
                    User.updateOne({
                        _id: user._id
                    }, {
                        $set: { isAuthenticated:false}
                    }, function (err, res) {
                        if (err) throw err;
                        console.log("logout");
                    }) .then(user => {
                        res.send(user.isAuthenticated)

    
    
                    })
                }
            
           

        }

    })

}
