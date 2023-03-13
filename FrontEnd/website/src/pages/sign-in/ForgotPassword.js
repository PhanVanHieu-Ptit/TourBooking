import {useState} from 'react';
import {toast} from 'react-toastify';
import {forgotPassword} from '../../utils/services';
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return toast.error('Không được để trống thông tin!');
        const rs = await forgotPassword({username: email});
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1>Quên mật khẩu</h1>
            <label htmlFor>Tên đăng nhập</label>
            <input
                type='text'
                placeholder='Nhập email của bạn'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button className='btn--gold'>Xác nhận</button>
        </form>
    );
}

export default ForgotPassword;
