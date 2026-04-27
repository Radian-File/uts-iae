const express = require('express');
const controller = require('../controllers/educationController');

const router = express.Router();

router.get('/', controller.getAllEducation);
router.get('/category', controller.getEducationCategory);
router.get('/:id', controller.getEducationById);
router.post('/', controller.createEducation);
router.put('/:id', controller.updateEducation);
router.delete('/:id', controller.deleteEducation);

module.exports = router;
