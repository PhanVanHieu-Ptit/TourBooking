function ForgotPassword() {
    return (
        <form action className='forgot-pass-frm'>
            <h1>Quên mật khẩu</h1>
            <label htmlFor>Tên đăng nhập</label>
            <input type='text' placeholder='Nhập email của bạn' />
            <button className='btn--gold'>Xác nhận</button>
            <a href='#'>Đăng nhập</a>
        </form>
    );
}

export default ForgotPassword;
