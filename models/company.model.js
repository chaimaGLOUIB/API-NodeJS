const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    companyName : {
        type : String
    },
    country: {
        type: String
    },
    address :{
        type : String
    },
    city :{
        type : String
    },
    phone :{
        type : String
    },
    email :{
        type : String
    }
    
});

module.exports = mongoose.model('Company', CompanySchema);