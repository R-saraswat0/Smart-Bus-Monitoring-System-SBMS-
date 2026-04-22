const express = require('express');
const router = express.Router();
const { getAll, create, remove } = require('../controllers/busLog.controller');
const auth = require('../middleware/auth');

router.get('/', getAll);
router.post('/', auth, create);
router.delete('/:id', auth, remove);

module.exports = router;
