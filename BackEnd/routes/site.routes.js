const express = require('express');
const router = express.Router();
const siteControllers = require('../controllers/SiteControllers');
const {authenticateToken, managerCheck} = require('../middlewares/authentication');

router.get('/number-staff', authenticateToken, siteControllers.getNumberStaff);
router.get('/number-tour', siteControllers.numberTour);
router.get('/list-status', siteControllers.listStatus);
router.get('/list-address', siteControllers.listAddress);
router.get('/get-own-infor', authenticateToken, siteControllers.getOwnInfor);
router.get('/statistic', siteControllers.statistic);
router.use('/', siteControllers.index);

module.exports = router;
