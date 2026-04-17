const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentVerification.controller');

router.post('/verify', controller.verifyStudent);
router.post('/mark-arrival', controller.markStudentArrival);
router.post('/send-guest-otp', controller.sendGuestOTP);
router.post('/mark-guest', controller.markGuestArrival);
router.get('/arrival-list/:busArrivalId', controller.getArrivalList);

module.exports = router;
