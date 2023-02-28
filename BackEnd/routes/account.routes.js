const express = require('express');
const router = express.Router();
const accountControllers = require('../controllers/AccountControllers')
const { authenticateToken, managerCheck, staffCheck } = require('../utils/middleware');
router.post('/sign-up', accountControllers.signUp);
router.post('/sign-in', accountControllers.signIn);
router.post('/auth', authenticateToken, staffCheck);

module.exports = router;