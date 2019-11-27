const express = require('express');
const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const emailController = require('../controllers/emailController');
const payController = require('../controllers/payController');
const gigController = require('../controllers/gigController')
const eventController = require('../controllers/eventController');

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
router.post('/dentalInsertProfile', profileController.dentalInsertProfile);

router.get('/tempDashboard', isAuth, authController.getTempDashboardInformation);
router.post('/postGig', gigController.postGig);
router.get('/jobPosting', gigController.jobPosting);
router.post('/acceptGig', gigController.acceptGig);
<<<<<<< HEAD

=======
router.put('/getEvents', eventController.getEvents);
>>>>>>> 6020f3222e78a020382de30822b8359bbfd9b076
module.exports = router;