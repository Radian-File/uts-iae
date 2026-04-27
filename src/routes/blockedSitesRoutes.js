const express = require('express');
const controller = require('../controllers/blockedSitesController');

const router = express.Router();

router.get('/', controller.getAllBlockedSites);
router.post('/', controller.createBlockedSite);
router.get('/:id', controller.getBlockedSiteById);
router.put('/:id', controller.updateBlockedSite);
router.delete('/:id', controller.deleteBlockedSite);

module.exports = router;
