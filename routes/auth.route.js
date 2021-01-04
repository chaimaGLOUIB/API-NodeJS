const express = require("express");
const router = express.Router();

module.exports = router;

const { googlelogin, facebooklogin, linkedinlogin, microsoftlogin,isAuthenticated, logout} = require("../controllers/auth.controller");

router.post('/googleLogin', googlelogin);
router.post('/facebookLogin', facebooklogin);
router.post('/linkedinLogin', linkedinlogin);
router.post('/microsoftLogin', microsoftlogin);
router.get('/isAuthenticated', isAuthenticated);
router.get('/logout', logout);
