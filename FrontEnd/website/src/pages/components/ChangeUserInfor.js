import defaultAvtSvg from '../../assets/svg/default-avt.svg';
import Address from './Address';
import css from './style.module.css';
import {useState} from 'react';
function ChangeUserInfo() {
    const [formData, setFormData] = useState({});
    const handleInputChange = () => {};
    return (
        <form action className={css['update-info'] + ' row-wrapper'}>
            <div className='col-wrapper' style={{cursor: 'pointer'}}>
                <img src={defaultAvtSvg} alt='' htmlFor='avt' />
                <input type='file' className='avt' id='avt' style={{display: 'none'}} />
            </div>
            <div className='col-wrapper'>
                <label>
                    Họ tên
                    <input type='text' />
                </label>
                <label>
                    Email
                    <input type='email' name='email' disabled />
                </label>
                <label>
                    Số điện thoại
                    <input type='email' name='email' />
                </label>
                <label>
                    Địa chỉ
                    <Address formData={formData} handleInputChange={handleInputChange} />
                </label>
            </div>

            <div className='col-wrapper'>
                <div className={css.wrapper}>
                    <p>Đổi mật khẩu</p>
                    <p>Hủy</p>
                </div>
                <label style={{marginTop: '12px'}}>
                    Mật khẩu hiện tại
                    <input type='password' />
                </label>
                <label>
                    Mật khẩu mới
                    <input type='password' name='password' />
                </label>
                <label>
                    Nhập lại mật khẩu
                    <input type='password' name='repeatPassword' />
                </label>
                <button type='submit' className='btn--gold'>
                    Lưu
                </button>
            </div>
        </form>
    );
}

export default ChangeUserInfo;
