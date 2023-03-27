const message = require('../utils/message');
const {encode} = require('../utils/my-bcrypt');
const {getToken} = require('../utils/token');
const connection = require('../utils/connection');
const {sendChangePassMail} = require('../utils/mail');
const calculateStart = require('../utils/calculateStart');
class StaffController {
    index(req, res) {
        res.send(message([], true, 'Staff'));
    }
    async getListStaff(req, res) {
        const key = req.query.key || '';
        const paging = req.query.paging ? req.query.paging : 1;
        let [rows, fields] = await connection.execute(
            `call managetour.sp_get_list_staff_by_key('%${key}%',${calculateStart(paging)});`,
        );

        return res.send(message(rows[0], true, 'Key:' + key));
    }
    async addStaff(req, res) {
        try {
            const {name, email, password, imageUrl} = req.body;
            let endcodedPassword = encode(password);

            await connection.execute('call managetour.sp_create_account(?, ?, ?);', [email, endcodedPassword, 'staff']);

            let [rows, fields] = await connection.execute('call managetour.sp_create_staff(?, ?, ?);', [
                name,
                email,
                imageUrl,
            ]);
            const token = getToken(email, true);
            const rs = await sendChangePassMail(email, token);
            if (rs.response.includes('OK')) {
                if (rows.affectedRows == 1) return res.send(message({}, true, 'Thêm mới nhân viên thành công!'));
                else res.send(message({}, false, 'Thêm mới nhân viên thất bại!'));
            }
            return res.send(message({}, false, 'Thêm mới nhân viên thất bại!'));
        } catch (error) {
            return res.send(message(error, false, error.message));
        }
    }
    async updateStaff(req, res) {
        try {
            const idStaff = req.params.id;
            const {name, imageUrl, idStatus} = req.body;
            let [rows, fields] = await connection.execute('call managetour.sp_update_staff(?, ?, ?);', [
                name,
                idStatus || 5,
                idStaff,
            ]);
            if (rows.affectedRows < 1) {
                return res.send(message(rows, false, 'Không tìm thấy nhân viên có id:' + idStaff));
            }
            if (imageUrl) await connection.execute('call managetour.sp_update_image_staff(?, ?);', [imageUrl, idStaff]);
            [rows, fields] = await connection.execute(`call managetour.sp_get_staff_by_id(${idStaff});`);

            return res.send(message(rows[0], true, 'Cập nhật nhân viên thành công'));
        } catch (error) {
            res.send(message(error, false, error.message));
        }
    }
    async toggleAccountStatus(req, res) {
        try {
            const idStaff = req.params.id;
            let [rows, fields] = await connection.execute(`call managetour.sp_get_staff_by_id(${idStaff});`);
            if (rows[0].length == 0) {
                return res.send(message(rows[0], false, 'Không tìm thấy nhân viên có id:' + idStaff));
            }
            if (rows[0][0].email == req.body.email) {
                return res.send(message('', false, 'Không thể tự khóa tài khoản!'));
            }

            //5 = unlock, 7 = locked
            //toggle new status depending on current status
            let newStatus = 5;
            if (rows[0][0].idStatus == 5) {
                newStatus = 7;
            }
            [rows, fields] = await connection.execute('call managetour.sp_update_status_staff(?, ?);', [
                newStatus,
                idStaff,
            ]);
            if (newStatus == 5) return res.send(message(true, true, 'Đã mở khóa tài khoản!'));
            if (newStatus == 7) return res.send(message(false, true, 'Đã khóa tài khoản!'));
        } catch (error) {
            res.send(message(error, false, error.message));
        }
    }
}

module.exports = new StaffController();
