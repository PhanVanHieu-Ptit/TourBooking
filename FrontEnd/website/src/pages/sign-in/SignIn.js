function SignIn() {
    return (
        <form action className='sign-in-frm'>
            <h1>Đăng nhập</h1>
            <label htmlFor>Tên đăng nhập</label>
            <input type='text' placeholder='Nhập email của bạn' />
            <label htmlFor>Mật khẩu</label>
            <div className='input-gr'>
                <input type='password' placeholder='Nhập mật khẩu' />
                <img src='../shared/toggle-pass.svg' alt='' className='toggle-pass' />
            </div>
            <button className='btn--gold'>Đăng nhập</button>
            <a href='#'>Quên mật khẩu</a>
            <a href='#'>Tạo tài khoản</a>
        </form>
    );
}

export default SignIn;
