const express = require('express');
const router = express.Router();
const { getAll, create } = require('../controllers/message.controller');
const auth = require('../middleware/auth');

router.get('/', auth, getAll);
router.post('/', auth, create);

module.exports = router;
