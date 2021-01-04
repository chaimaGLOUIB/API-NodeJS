const express = require('express');
const router = express.Router();

const company_controller = require('../controllers/company.controller');


module.exports = router;

router.post('/add', company_controller.create_company);