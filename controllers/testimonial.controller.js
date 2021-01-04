const Testimonial = require('../models/testimonial.model');

exports.create_testimonial = function(req, res) {
    let testimonial = new Testimonial(req.body);
    testimonial.save()
        .then(testimonial => {
            res.status(200).json({ 'testimonial': 'testimonial added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new testimonial failed');
        });
}
exports.all_testimonials = function(req, res) {
    Testimonial.find()
        .then(testimonials => {
            res.send(testimonials);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving testimonials."
            });
        });
}