const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/tempRegister', authController.tempRegister);
module.exports = router;