const express = require('express');
const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const emailController = require('../controllers/emailController');
const payController = require('../controllers/payController');
const gigController = require('../controllers/gigController')
const eventController = require('../controllers/eventController');
const adminController = require('../controllers/adminController');
const recordsController = require('../controllers/recordsController')
const registerController = require('../controllers/registerController');

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/email', emailController.contactUsEmail);

router.post('/tempRegister', registerController.tempRegister, emailController.tempRegisterEmail);
router.post('/dentalRegister', registerController.dentalRegister, emailController.dentalRegisterEmail);

router.get('/payment', payController.getToken);
router.post('/checkout', payController.checkout);
router.post('/getGigDetails', payController.getGigDetails);

router.get('/tempProfile', isAuth, profileController.tempProfile);
router.post('/tempUpdateProfile',isAuth, profileController.tempUpdateProfile);
router.post('/dentalProfile', isAuth, profileController.dentalProfile);
router.post('/dentalUpdateProfile', isAuth, profileController.dentalUpdateProfile);
router.post('/dentalInsertProfile', isAuth, profileController.dentalInsertProfile);

router.get('/tempDashboard', isAuth, authController.getTempDashboardInformation);
router.post('/postGig', isAuth, gigController.postGig, emailController.gigPostedEmail);
router.get('/jobPosting', isAuth, gigController.jobPosting);
router.put('/gigCard', isAuth, gigController.gigCard);
router.put('/gigCardOffice', isAuth, gigController.gigCardOffice);
router.post('/acceptGig', isAuth, gigController.acceptGig, emailController.gigAcceptedEmail);
router.put('/getEvents', isAuth, eventController.getEvents);
router.put('/getEventsOffice', isAuth, eventController.getEventsOffice);
router.post('/addTime', isAuth, gigController.addTime, emailController.addTimeEmail);
router.post('/getRecords', isAuth, recordsController.getRecords);

router.get('/admin', adminController.tempData);

module.exports = router;