const express = require('express');
const router = express.Router();

const agence_controller = require('../controllers/agence.controller');

module.exports = router;
router.get('/', agence_controller.all_agencies);
router.post('/add', agence_controller.create_agence);