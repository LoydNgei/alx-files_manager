// Contains all endoints of our APIs

const express = require('express');
// eslint-disable-next-line import/no-unresolved, import/extensions
const AppController = require('../controllers/AppController');

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
