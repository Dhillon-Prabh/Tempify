const express = require('express');
const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/authController');
const emailController = require('../controllers/emailController');

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/email', emailController.contactUsEmail);

router.post('/tempRegister', authController.tempRegister, emailController.tempRegisterEmail);
router.post('/dentalRegister', authController.dentalRegister, emailController.dentalRegisterEmail);
router.get('/tempProfile',isAuth, authController.tempProfile, emailController.tempRegisterEmail);
// router.get('/tempProfile', authController.tempProfile, emailController.tempRegisterEmail);

module.exports = router;