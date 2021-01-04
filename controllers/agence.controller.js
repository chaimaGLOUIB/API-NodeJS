const Agence = require('../models/agence.model');


exports.create_agence = function(req, res) {
    let agence = new Agence(req.body);
    agence.save().then(agence => {
            res.status(200).json({ 'agence': 'agence added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new agence failed');
        });
}

exports.all_agencies = function(req, res) {

    Agence.find().then(agencies => {
        res.send(agencies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving annoncements."
        });
    });

}