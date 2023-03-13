import css from './style.module.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {signUp} from '../../utils/services';
import React from 'react';
import Address from './../components/Address';

const PersonalInfo = ({formData, setFormData, handleInputChange, setPersonalInfoForm}) => {
    const validateInfForm = () => {
        if (!formData.name || !formData.phoneNumber || !formData.address)
            return toast.error('Không được bỏ trống thông tin!');

        setPersonalInfoForm(false);
    };
    return (
        <>
            <label>Họ tên</label>
            <input
                type='text'
                placeholder='Nhập họ tên của bạn'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
            />
            <label>Số điện thoại</label>
            <input
                type='text'
                placeholder='Nhập số điện thoại của bạn'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleInputChange}
            />
            <label>Địa chỉ</label>
            <Address formData={formData} handleInputChange={handleInputChange} />

            <button className='btn--gold mt--24' onClick={validateInfForm} type='button'>
                Tiếp theo
            </button>
        </>
    );
};
const AccountInf = ({formData, setFormData, handleInputChange, setPersonalInfoForm, setFormType}) => {
    const validateAccForm = async () => {
        if (!formData.email || !formData.password || !formData.repeatPassword) {
            return toast.error('Không được bỏ trống thông tin!');
        }
        if (formData.password != formData.repeatPassword) {
            return toast.error('Mật khẩu không trùng khớp!');
        }
        const rs = await signUp(formData);
        console.log(rs.status);
        if (rs.status) setFormType('login');
    };
    return (
        <>
            <label>Email(Tên đăng nhập)</label>
            <input
                type='text'
                placeholder='Nhập email của bạn'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
            />
            <label>Mật khẩu</label>
            <div className={css['input-gr']}>
                <input
                    type='password'
                    placeholder='Nhập mật khẩu'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <img src='../shared/toggle-pass.svg' alt='' className={css['toggle-pass']} />
            </div>
            <label>Nhập lại mật khẩu</label>
            <div className={css['input-gr']}>
                <input
                    type='password'
                    placeholder='Nhập mật khẩu'
                    name='repeatPassword'
                    value={formData.repeatPassword}
                    onChange={handleInputChange}
                />
                <img src='../shared/toggle-pass.svg' alt='' className={css['toggle-pass']} />
            </div>
            <div className='row-wrapper flex-align-c'>
                <button className={css.swapper + ' mt--24'} onClick={() => setPersonalInfoForm(true)}>
                    Trở lại
                </button>
                <button className='btn--gold mt--24' type='button' onClick={validateAccForm}>
                    Đăng ký
                </button>
            </div>
        </>
    );
};
function SignUp({setFormType}) {
    const [personalInfoForm, setPersonalInfoForm] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address: 'Thành phố Hà Nội',
        email: '',
        password: '',
        repeatPassword: '',
    });
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <form>
            <h1>Tạo tài khoản</h1>
            {personalInfoForm ? (
                <PersonalInfo
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    setPersonalInfoForm={setPersonalInfoForm}></PersonalInfo>
            ) : (
                <AccountInf
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    setPersonalInfoForm={setPersonalInfoForm}
                    setFormType={setFormType}></AccountInf>
            )}
        </form>
    );
}

export default SignUp;
