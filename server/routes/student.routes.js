const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentVerification.controller');
const auth = require('../middleware/auth');

router.post('/verify',          auth, controller.verifyStudent);
router.post('/mark-arrival',    auth, controller.markStudentArrival);
router.post('/send-guest-otp',  auth, controller.sendGuestOTP);
router.post('/mark-guest',      auth, controller.markGuestArrival);
router.get('/arrival-list/:busArrivalId', auth, controller.getArrivalList);

module.exports = router;
