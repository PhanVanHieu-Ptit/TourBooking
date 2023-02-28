const express = require('express');
const router = express.Router();
const accountControllers = require('../controllers/AccountControllers')

router.post('/sign-up', accountControllers.signUp);

module.exports = router;