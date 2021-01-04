const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    author: {
        type: String
    },
    authorFunction: {
        type: String
    },
    content: {
        type: String
    }
})

module.exports = Testimonial = mongoose.model('Testimonial', TestimonialSchema);