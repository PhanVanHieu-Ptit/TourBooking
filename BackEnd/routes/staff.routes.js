const express = require('express');
const router = express.Router();
const staffControllers = require('../controllers/StaffControllers')
const { staffInsert } = require('../middlewares/staff')
const { accountInsert } = require('../middlewares/account')

router.post('/add', staffInsert, staffControllers.addStaff);
router.post('/', staffControllers.index);

module.exports = router;