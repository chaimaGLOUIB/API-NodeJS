const express = require('express');
const router = express.Router();

const annoncement_controller = require('../controllers/annonce.controller');


module.exports = router;
router.get('/', annoncement_controller.all_annoncements);
router.get('/categorie1', annoncement_controller.categorie);
router.post('/add', annoncement_controller.create_annoncement);