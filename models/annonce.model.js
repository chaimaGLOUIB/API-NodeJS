const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnonceSchema = new Schema({
    jobName : {
        type : String
    },
    salary: {
        type: String
    },
    jobDescription :{
        type : String
    },
    dateJob :{
        type : Date
    }
    
});

module.exports = mongoose.model('Annonce', AnnonceSchema);