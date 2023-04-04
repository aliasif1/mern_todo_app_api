const express = require('express');
const {userSignup, userLogin} = require('../controllers/authController');
const router = express.Router();

// user sign up
router.post('/signup', userSignup);

// user log in
router.post('/login', userLogin);

module.exports = router;