const express = require('express');
const router = express.Router();
const staffControllers = require('../controllers/StaffControllers')

router.post('/add', staffControllers.addStaff);
router.post('/', staffControllers.index);

module.exports = router;