const express = require('express');
const router = express.Router();
const { getAll, create, update, remove } = require('../controllers/bus.controller');
const auth = require('../middleware/auth');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.put('/:busNumber', auth, update);
router.delete('/:busNumber', auth, remove);

module.exports = router;
