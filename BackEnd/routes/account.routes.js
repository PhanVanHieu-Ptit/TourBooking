const express = require('express');
const router = express.Router();
const accountControllers = require('../controllers/AccountControllers')
const authentication = require('../utils/middleware');
router.post('/sign-up', accountControllers.signUp);
router.post('/sign-in', accountControllers.signIn);
router.post('/auth', authentication);

module.exports = router;