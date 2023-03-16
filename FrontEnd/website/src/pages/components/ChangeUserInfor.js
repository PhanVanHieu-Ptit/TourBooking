import defaultAvtSvg from '../../assets/svg/default-avt.svg';
import Address from './Address';
import css from './style.module.css';
import {toast} from 'react-toastify';
import React, {useState, useEffect} from 'react';
import {changePassword, getOwnInfor, updateCustomerInfo} from '../../utils/services';

const PersonalInfo = ({setPersonalInfoForm}) => {
    const [formData, setFormData] = useState(null);
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSaveUserInfo = async () => {
        if (!formData.name || !formData.phoneNumber || !formData.address)
            return toast.error('Không được bỏ trống thông tin!');
        const rs = await updateCustomerInfo(formData);
    };
    useEffect(() => {
        getOwnInfor().then((rs) => setFormData(rs.data[0]));
    }, []);
    return (
        <>
            {formData && (
                <>
                    <div className='col-wrapper' style={{cursor: 'pointer'}}>
                        <img src={formData.imageUrl || defaultAvtSvg} alt='' htmlFor='avt' />
                        <input type='file' className='avt' id='avt' style={{display: 'none'}} />
                    </div>
                    <p
                        className='mt--24'
                        style={{
                            textAlign: 'right',
                            color: 'var(--gold)',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                        onClick={() => setPersonalInfoForm(false)}>
                        Đổi mật khẩu?
                    </p>
                    <label>Email</label>
                    <input type='text' disabled value={formData.email} />
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
                    <button className='btn--gold mt--24' onClick={handleSaveUserInfo} type='button'>
                        Lưu
                    </button>
                </>
            )}
        </>
    );
};

const AccountInf = ({setPersonalInfoForm}) => {
    const [formData, setFormData] = useState({oldPassword: '', newPassword: '', repeatPassword: ''});
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePassword = async () => {
        if (!formData.oldPassword || !formData.repeatPassword || !formData.newPassword) {
            return toast.error('Không được bỏ trống thông tin!');
        }
        if (formData.newPassword != formData.repeatPassword) {
            return toast.error('Mật khẩu không trùng khớp!');
        }
        const rs = await changePassword(formData);
    };
    return (
        <>
            <label>Mật khẩu hiện tại: </label>
            <div className={css['input-gr']}>
                <input
                    type='password'
                    placeholder='Nhập mật khẩu hiện tại!'
                    name='oldPassword'
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                />
                <img src='../shared/toggle-pass.svg' alt='' className={css['toggle-pass']} />
            </div>
            <label>Mật khẩu mới</label>
            <div className={css['input-gr']}>
                <input
                    type='password'
                    placeholder='Nhập mật khẩu'
                    name='newPassword'
                    value={formData.newPassword}
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
                <p className={'mt--24'} onClick={() => setPersonalInfoForm(true)}>
                    Trở lại
                </p>
                <button className='btn--gold mt--24' type='button' onClick={handleChangePassword}>
                    Đổi mật khẩu
                </button>
            </div>
        </>
    );
};
function ChangeUserInfo() {
    const [personalInfoForm, setPersonalInfoForm] = useState(true);

    return (
        <form action className={css['update-info']}>
            {personalInfoForm ? (
                <PersonalInfo setPersonalInfoForm={setPersonalInfoForm}></PersonalInfo>
            ) : (
                <AccountInf setPersonalInfoForm={setPersonalInfoForm}></AccountInf>
            )}
        </form>
    );
}

export default ChangeUserInfo;
