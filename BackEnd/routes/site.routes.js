const express = require('express');
const router = express.Router();
const siteControllers = require('../controllers/SiteControllers')

router.get('/list-address', siteControllers.listAddress);
router.use('/', siteControllers.index);

module.exports = router;