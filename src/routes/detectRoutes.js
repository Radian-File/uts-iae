const express = require('express');
const controller = require('../controllers/detectController');

const router = express.Router();

router.post('/', controller.detectUrl);
router.get('/result', controller.getDetectionResult);
router.get('/status', controller.getDetectionStatus);

module.exports = router;
