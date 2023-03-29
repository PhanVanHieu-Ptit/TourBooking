import svg from './../../assets/svg/index';
import {useState} from 'react';
import {addStaff} from '../../utils/services';
import uploadImg from './../../utils/image';
function AddStaff() {
    const [formData, setformData] = useState({
        name: '',
        email: '',
        imageUrl: '',
    });
    const handleValueChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        addStaff(formData);
    };
    const handleUploadImage = (e) => {
        uploadImg(e.target.files[0]).then((rs) => setformData({...formData, imageUrl: rs}));
    };
    return (
        <form className='admin-form' onSubmit={handleSubmit}>
            <label htmlFor='staffImg'>
                <img
                    src={formData.imageUrl || svg.defaultAvt}
                    alt=''
                    name='imageUrl'
                    onChange={handleValueChange}
                    value={formData.imageUrl}
                />
                <input type='file' id='staffImg' style={{display: 'none'}} onChange={handleUploadImage} />
            </label>
            <label>Họ tên</label>
            <input
                type='text'
                name='name'
                onChange={handleValueChange}
                value={formData.name}
                placeholder='Nhập họ tên'
            />
            <label>Email</label>
            <input
                type='email'
                name='email'
                onChange={handleValueChange}
                value={formData.email}
                placeholder='Nhập mail'
            />
            <button type='submit' className='btn--gold'>
                Thêm
            </button>
        </form>
    );
}

export default AddStaff;
