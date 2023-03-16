import css from './style.module.css';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react';
import {signIn} from '../../utils/services';
function useAuth() {
    const handleSignIn = async (e, formData) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            toast.error('Tên đăng nhập và mật khẩu không được để trống');
            return;
        }
        const rs = await signIn(formData);
        if (!rs.status) {
            return;
        }
        localStorage.setItem('token', rs.Authorization);
        localStorage.setItem('role', rs.data[0].role);
        console.log('set token:', localStorage.getItem('token'));
        if (localStorage.role == 'customer') window.location.href = '/';
        else window.location.href = '/manage-tour';
    };
    return {
        handleSignIn,
    };
}

function SignIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const {handleSignIn} = useAuth();
    const handleDataChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <form onSubmit={(e) => handleSignIn(e, formData)}>
            <h1>Đăng nhập</h1>
            <label>
                Tên đăng nhập
                <input
                    name='username'
                    type='text'
                    placeholder='Nhập email của bạn'
                    value={formData.username}
                    onChange={handleDataChange}
                />
            </label>
            <label className={css['input-gr']}>
                Mật khẩu
                <input
                    name='password'
                    type='password'
                    placeholder='Nhập mật khẩu'
                    value={formData.password}
                    onChange={handleDataChange}
                />
                <img src='../shared/toggle-pass.svg' alt='' className={css['toggle-pass']} />
            </label>
            <button className='btn--gold' type='submit'>
                Đăng nhập
            </button>
        </form>
    );
}

export default SignIn;
