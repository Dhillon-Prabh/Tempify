const express = require('express');
const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const emailController = require('../controllers/emailController');
const payController = require('../controllers/payController');
const gigController = require('../controllers/gigController')
const eventController = require('../controllers/eventController');
const recordsController = require('../controllers/recordsController')

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/email', emailController.contactUsEmail);

router.post('/tempRegister', authController.tempRegister, emailController.tempRegisterEmail);
router.post('/dentalRegister', authController.dentalRegister, emailController.dentalRegisterEmail);

router.get('/payment', payController.getToken);
router.post('/checkout', payController.checkout);
router.post('/getGigDetails', payController.getGigDetails);

router.get('/tempProfile', isAuth, profileController.tempProfile);
router.post('/tempUpdateProfile',isAuth, profileController.tempUpdateProfile);
router.get('/dentalProfile', isAuth, profileController.dentalProfile);
router.post('/dentalUpdateProfile', isAuth, profileController.dentalUpdateProfile);


//add isAuth
router.post('/dentalInsertProfile', profileController.dentalInsertProfile);

router.get('/tempDashboard', isAuth, authController.getTempDashboardInformation);
router.put('/getEvents', isAuth, eventController.getEvents);
router.post('/postGig', isAuth, gigController.postGig);
router.get('/jobPosting', isAuth, gigController.jobPosting);
router.post('/acceptGig', isAuth, gigController.acceptGig);
router.get('/getRecords', isAuth, recordsController.getRecords);






//add isAuth 
router.put('/gigCard', gigController.gigCard);
router.put('/gigCardOffice', gigController.gigCardOffice);
router.put('/getEventsOffice', eventController.getEventsOffice);
router.post('/addTime', gigController.addTime);


module.exports = router;