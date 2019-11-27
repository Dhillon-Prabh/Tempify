const express = require('express');
const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const emailController = require('../controllers/emailController');
const gigController = require('../controllers/gigController')
const recordsController = require('../controllers/recordsController')

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/email', emailController.contactUsEmail);

router.post('/tempRegister', authController.tempRegister, emailController.tempRegisterEmail);
router.post('/dentalRegister', authController.dentalRegister, emailController.dentalRegisterEmail);

router.get('/tempProfile', isAuth, profileController.tempProfile);
router.post('/tempUpdateProfile',isAuth, profileController.tempUpdateProfile);
router.get('/dentalProfile', isAuth, profileController.dentalProfile);
router.post('/dentalUpdateProfile', isAuth, profileController.dentalUpdateProfile);

router.get('/tempDashboard', isAuth, authController.getTempDashboardInformation);
router.post('/postGig', isAuth, gigController.postGig);
router.get('/jobPosting', isAuth, gigController.jobPosting);
router.post('/acceptGig', isAuth, gigController.acceptGig);


router.get('/getRecords', isAuth, recordsController.getRecords);

module.exports = router;