const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8000;
const annonce = require('./routes/annonce.route');
const company = require('./routes/company.route');
const agence = require('./routes/agence.route');
const googlelogin = require('./routes/auth.route');
const linkedinlogin = require('./routes/auth.route');
const facebooklogin = require('./routes/auth.route');
const microsoftlogin = require('./routes/auth.route');
const isAuthenticated= require('./routes/auth.route');
const logout= require('./routes/auth.route');
const testimonial = require('./routes/testimonial.route');

require('./models/user.model');


app.use(cors());
app.use(bodyParser.json());
dotenv.config();
console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
})

app.use('/annonces', annonce);
app.use('/company', company);
app.use('/agences', agence);
app.use('/auth/google', googlelogin);
app.use('/auth/facebook', facebooklogin);
app.use('/auth/linkedin', linkedinlogin);
app.use('/auth/microsoft', microsoftlogin);
app.use('/auth/isAuthenticated',isAuthenticated);
app.use('/auth/logout',logout);


app.use('/testimonial', testimonial);



app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});