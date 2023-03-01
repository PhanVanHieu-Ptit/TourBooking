const express = require('express');
const router = express.Router();
const accountControllers = require('../controllers/AccountControllers')
const { authenticateToken, managerCheck, staffCheck } = require('../middlewares/authentication');
const { accountInsert } = require('../middlewares/account');
const { customerInsert } = require('../middlewares/customer');

router.post('/sign-up', accountInsert, customerInsert, accountControllers.signUp);
router.post('/sign-in', accountControllers.signIn);
router.post('/change-password', authenticateToken, accountControllers.changePassword);

module.exports = router;