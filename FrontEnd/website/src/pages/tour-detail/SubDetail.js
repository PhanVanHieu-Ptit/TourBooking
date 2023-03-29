import css from './style.module.css';
import {useState} from 'react';
import {orderTour} from '../../utils/services';
import {toast} from 'react-toastify';

function SubDetail({memoizedOptions, idTour}) {
    const data = memoizedOptions;
    const [formData, setFormData] = useState({
        idTour,
        quantity: 1,
        note: '',
    });
    const handleValueChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!localStorage.token) return toast.error('Vui lòng đăng nhập để đặt tour');
        orderTour(formData);
    };

    const [image, setImage] = useState(data.imageUrl[0]);
    return (
        <div className={css['sub-details']}>
            <div className={css['left-area']}>
                <div className={css['image-area']}>
                    <img src={image} alt='' className={css['big-display']} />
                    <div className={css['images']}>
                        {data.imageUrl.map((e, i) => (
                            <img key={i} src={e} alt='Hình Ảnh Tour' onClick={(e) => setImage(e.target.src)} />
                        ))}
                    </div>
                </div>
                <h1>Chi tiết</h1>
                <div className={css.description}>{data.tourDetail}</div>
            </div>
            <div className={css['right-area']}>
                <h1>Giới thiệu</h1>
                <p className={css['intro']}>{data.tourIntro}</p>
                <form className={css['booking-frm']} onSubmit={handleSubmit}>
                    <label htmlFor='quantity'>Số người</label>
                    <input
                        type='number'
                        name='quantity'
                        onChange={handleValueChange}
                        value={formData.quantity}
                        min='1'
                    />
                    <label htmlFor='note'>Ghi chú</label>
                    <textarea cols={30} rows={10} name='note' onChange={handleValueChange} value={formData.note} />
                    <button className='btn--gold' type='submit'>
                        Đặt ngay
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SubDetail;
