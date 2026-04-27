const express = require('express');
const controller = require('../controllers/reportController');

const router = express.Router();

router.post('/', controller.createReport);
router.get('/', controller.getAllReports);
router.get('/status', controller.getReportStatus);
router.get('/:id', controller.getReportById);
router.put('/:id', controller.updateReport);
router.delete('/:id', controller.deleteReport);

module.exports = router;
