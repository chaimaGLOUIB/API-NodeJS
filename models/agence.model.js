const mongoose = require('mongoose');

const AgenceSchema = new mongoose.Schema({
    agence_id: {
        type: Number
    },
    agence_nom: {
        type: String
    },
    agence_pays: {
        type: String
    },
    agence_region: {
        type: String
    },
    agence_secteur: {
        type: String
    }
})

module.exports = Agence = mongoose.model('Agence', AgenceSchema);