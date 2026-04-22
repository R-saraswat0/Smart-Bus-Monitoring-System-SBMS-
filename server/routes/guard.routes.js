const express = require('express');
const router = express.Router();
const { getGuards, addGuard, removeGuard, resetPassword } = require('../controllers/guard.controller');
const auth = require('../middleware/auth');

router.get('/', getGuards);
router.post('/', auth, addGuard);
router.delete('/:id', auth, removeGuard);
router.put('/:id/reset-password', auth, resetPassword);

module.exports = router;
