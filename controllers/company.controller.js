const Company = require('../models/company.model');
exports.create_company = function (req, res) {
    let company = new Company({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        companyName:req.body.companyName ,
        country:req.body.country,
        address:req.body.address,
        city:req.body.city,
        phone:req.body.phone,
        email:req.body.email, 
    });

    company.save()
        .then(company=> {
            res.status(200).json({ 'company': 'company added successfully' });
            console.log(req.body);
        })
        .catch(err => {
            res.status(400).send('adding new company failed');
        });
}