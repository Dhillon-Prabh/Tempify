const express = require('express');
const authController = require('../controllers/authController');
const emailController = require('../controllers/emailController');


const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/email', emailController.contactUsEmail);

module.exports = router;