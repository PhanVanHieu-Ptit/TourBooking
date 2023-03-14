const express = require('express');
const router = express.Router();
const customerControllers = require('../controllers/CustomerControllers');
const {authenticateToken} = require('../middlewares/authentication');
const {customerInsert} = require('../middlewares/customer');

router.post('/update', authenticateToken, customerInsert, customerControllers.update);
router.get('/get-own-infor', authenticateToken, customerControllers.getOwnInfor);

module.exports = router;
