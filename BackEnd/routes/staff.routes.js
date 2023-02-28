const express = require('express');
const router = express.Router();
const StaffControllers = require('../controllers/StaffControllers')

router.post('/', StaffControllers.index);

module.exports = router;