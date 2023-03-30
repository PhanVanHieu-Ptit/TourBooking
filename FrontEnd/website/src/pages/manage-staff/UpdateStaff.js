import Popup from '../../components/Popup';
import svg from './../../assets/svg/index';
import uploadImg from './../../utils/image';
import css from './style.module.css';
import {useState} from 'react';
import {updateStaff} from '../../utils/services';
function UpdateStaff({data, setData}) {
    const [formData, setFormData] = useState(data);
    const handleInputChange = (e) => {
        formData = {
            ...formData,
            [e.target.name]: e.target.value,
        };
    };

    const handleImageChange = (e) => {
        uploadImg(e.target.files[0]).then((rs) =>
            setFormData({
                ...formData,
                imageUrl: rs,
            }),
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStaff(formData, formData.idStaff).then((rs) => {
            if (rs.status) setData(rs.data[0]);
        });
    };
    return (
        <form className='admin-form' onSubmit={handleSubmit}>
            <label style={{cursor: 'pointer'}} htmlFor='avt'>
                <img src={formData.imageUrl || svg.defaultAvt} alt='' className='radius-50 form-avt' />
                <input type='file' className='avt' id='avt' style={{display: 'none'}} onChange={handleImageChange} />
            </label>
            <label>Email</label>
            <input type='text' disabled value={formData.email} />
            <label>Họ tên</label>
            <input
                type='text'
                placeholder='Nhập họ tên của bạn'
                name='name'
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <label className={css['lock-account']} htmlFor='idStatus'>
                <input
                    type='checkbox'
                    name='idStatus'
                    checked={formData.idStatus == 7}
                    id='idStatus'
                    onChange={() =>
                        setFormData({
                            ...formData,
                            idStatus: formData.idStatus == 5 ? 7 : 5,
                        })
                    }
                />
                <label htmlFor='idStatus'>Khoá tài khoản</label>
            </label>
            <button className='btn--gold' style={{margin: '0px auto', display: 'block'}}>
                Lưu
            </button>
        </form>
    );
}

export default UpdateStaff;
