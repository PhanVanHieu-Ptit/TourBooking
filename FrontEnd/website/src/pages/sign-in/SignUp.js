function SignUp() {
    return (
        <form action className='sign-up-frm'>
            <h1>Tạo tài khoản</h1>
            <label htmlFor>Tên đăng nhập</label>
            <input type='text' placeholder='Nhập email của bạn' />
            <label htmlFor>Mật khẩu</label>
            <div className='input-gr'>
                <input type='password' placeholder='Nhập mật khẩu' />
                <img src='../shared/toggle-pass.svg' alt='' className='toggle-pass' />
            </div>
            <label htmlFor>Nhập lại mật khẩu</label>
            <div className='input-gr'>
                <input type='password' placeholder='Nhập mật khẩu' />
                <img src='../shared/toggle-pass.svg' alt='' className='toggle-pass' />
            </div>
            <button className='btn--gold'>Đăng ký</button>
            <a href='#'>Đăng nhập</a>
        </form>
    );
}

export default SignUp;
