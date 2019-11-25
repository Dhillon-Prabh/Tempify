const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const emailController = require('../controllers/emailController');
const payController = require('../controllers/payController');

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/email', emailController.contactUsEmail);

router.post('/tempRegister', authController.tempRegister, emailController.tempRegisterEmail);
router.post('/dentalRegister', authController.dentalRegister, emailController.dentalRegisterEmail);

router.post('/tempProfile', profileController.tempProfile);
router.post('/tempUpdateProfile', profileController.tempUpdateProfile);
router.post('/dentalProfile', profileController.dentalProfile);
router.post('/dentalUpdateProfile', profileController.dentalUpdateProfile);

router.get('/payment', payController.getToken);
router.post('/checkout', payController.checkout);
router.post('/getGigDetails', payController.getGigDetails);

module.exports = router;