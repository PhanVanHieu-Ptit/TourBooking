const express = require('express');
const router = express.Router();
const siteControllers = require('../controllers/SiteControllers');
const {authenticateToken} = require('../middlewares/authentication');

router.get('/list-status', siteControllers.listStatus);
router.get('/list-address', siteControllers.listAddress);
router.get('/get-own-infor', authenticateToken, siteControllers.getOwnInfor);
router.use('/', siteControllers.index);

module.exports = router;
