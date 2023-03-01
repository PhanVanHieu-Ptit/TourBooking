async function staffVerify(req, res, next) {
  let { name, email, imageUrl } = req.body;
  console.log("staffVerify: ", name, email, imageUrl);
  if (!name) {
    return res.send(message('', false, 'Tên không được để trống!'))
  }
  if (name.length < 3) {
    return res.send(message('', false, 'Tên có ít nhất 3 kí tự!'));
  }
  if (imageUrl == 'undefined')
    req.body.imageUrl = null;
}