const Annonce = require('../models/annonce.model');
const solrConnection = require("./solrconnection");


exports.create_annoncement = function (req, res) {
    let annonce = new Annonce({
        jobName : req.body.jobName,
        salary: req.body.salary,
        jobDescription: req.body.jobDescription,
        dateJob :new Date()
    });

    annonce.save()
        .then(annonce => {
            res.status(200).json({ 'annonce': 'annonce added successfully' });
            console.log(req.body);
        })
        .catch(err => {
            res.status(400).send('adding new annonce failed');
        });
}
exports.all_annoncements = function (req, res) {

    Annonce.find()
        .then(annonces => {
            res.send(annonces);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving annoncements."
            });
        });


}
exports.categorie = function (req, res) {

    Annonce.find()
        .then(annonces => {
            solrConnection.delete('*:*');

            for (let i = 0; i < annonces.length; i++) {


                solrConnection.update(annonces[i], function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Response: ', result.responseHeader);
                });
            };
        });
    var strQuery = solrConnection.query().q('annonce_title:jobs3');
    solrConnection.search(strQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(result.response);
    });

}