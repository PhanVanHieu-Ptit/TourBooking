// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tuanhungtester@gmail.com',
    pass: 'vckkyhvzvelxajsq'
  }
});

// Message object

async function sendChangePassMail(mail, token) {
  let message = {
    from: 'Sender Name <bookingtour.com>',
    to: mail,
    subject: 'Đổi mật khẩu bookingtour.com',
    text: 'Xin chào!',
    html: `<p> Click vào <a href="http://localhost:3000/account/change-password-form?token=${token}"> đây </a> để đổi mật khẩu!<p/> 
    <p>Link chỉ có hiệu lực trong 5 phút</p>
    `
  };
  let rs = await transporter.sendMail(message);
  return rs;
}

module.exports = { sendChangePassMail }
