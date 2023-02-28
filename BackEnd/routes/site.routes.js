const express = require('express');
const router = express.Router();
const siteControllers = require('../controllers/SiteControllers')

router.use('/', siteControllers.index);

module.exports = router;