const express = require('express');
const router = express.Router();
const staffControllers = require('../controllers/StaffControllers')
const { staffInsert } = require('../middlewares/staff')
const { accountInsert } = require('../middlewares/account')
const { managerCheck, authenticateToken } = require('../middlewares/authentication')

router.get('/list', authenticateToken, managerCheck, staffControllers.getListStaff);
router.post('/add', authenticateToken, managerCheck, staffInsert, accountInsert, staffControllers.addStaff);
router.put('/:id/update', authenticateToken, managerCheck, staffInsert, staffControllers.updateStaff);
router.patch('/:id/toggle-account-status', authenticateToken, managerCheck, staffControllers.toggleAccountStatus);
router.post('/', authenticateToken, managerCheck, staffControllers.index);

module.exports = router;