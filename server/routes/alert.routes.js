const express = require('express');
const router = express.Router();
const { getAll, create, resolve, remove } = require('../controllers/alert.controller');
const auth = require('../middleware/auth');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.patch('/:id/resolve', auth, resolve);
router.delete('/:id', auth, remove);

module.exports = router;
