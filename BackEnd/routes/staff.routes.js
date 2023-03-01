const express = require('express');
const router = express.Router();
const staffControllers = require('../controllers/StaffControllers')
const { star } = require('../middlewares')

router.post('/add', staffControllers.addStaff);
router.post('/', staffControllers.index);

module.exports = router;