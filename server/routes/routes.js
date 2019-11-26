const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const emailController = require('../controllers/emailController');

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/email', emailController.contactUsEmail);

router.post('/tempRegister', authController.tempRegister, emailController.tempRegisterEmail);
router.post('/dentalRegister', authController.dentalRegister, emailController.dentalRegisterEmail);

router.post('/tempProfile', profileController.tempProfile);
router.post('/tempUpdateProfile', profileController.tempUpdateProfile);
router.post('/dentalProfile', profileController.dentalProfile);
router.post('/dentalUpdateProfile', profileController.dentalUpdateProfile);
router.post('/dentalInsertProfile', profileController.dentalInsertProfile);

module.exports = router;