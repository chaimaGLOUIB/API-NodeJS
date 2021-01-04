const express = require('express');
const router = express.Router();

const testimonial_controller = require('../controllers/testimonial.controller');


module.exports = router;
router.get('/', testimonial_controller.all_testimonials);
router.post('/add', testimonial_controller.create_testimonial);