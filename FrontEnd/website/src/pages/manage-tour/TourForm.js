import svg from './../../assets/svg/index';
import {useState} from 'react';
import Address from './../components/Address';
import uploadImg from './../../utils/image';
import css from './style.module.css';
import {addTour, updateTour} from '../../utils/services';
import formatMoney from './../../utils/formatMoney';
import CurrencyInput from '../components/CurrencyInput';
import formatDate from '../../utils/formatDate';
function TourForm({tourData, setTourData, listTour, setListTour, update = true}) {
    const [formData, setFormData] = useState(() => {
        tourData.startDate = tourData.startDate && formatDate(tourData.startDate)[0];
        tourData.dateCreate = tourData.dateCreate && formatDate(tourData.dateCreate)[0];
        return (
            tourData || {
                name: 'Tour đà lạt 2 ngày 3 đêm',
                startDate: '2023-05-09 00:12:00',
                startDay: '',
                startTime: '',
                totalDay: 0,
                minQuantity: 0,
                maxQuantity: 10,
                normalPenaltyFee: 5,
                strictPenaltyFee: 10,
                minDate: 5,
                tourGuide: 1,
                tourIntro: 'Tour intro',
                tourDetail: 'Tour details',
                pickUpPoint: 'Thành phố Hà Nội',
                detailPickUpPoint: 'detail-pick-up',
                tourDestination: 'Thành phố Hà Nội',
                detailTourDestination: 'detail-destination',
                price: 2000000,
                featured: 1,
                imageUrl: [],
            }
        );
    });
    console.log(formData);

    const handleInputChange = (e) => {
        console.log({[e.target.name]: e.target.value});
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleFileChange = (e) => {
        uploadImg(e.target.files[0]).then((rs) => {
            formData.imageUrl.push(rs);
            setFormData({...formData});
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.price =
            typeof formData.price == 'number' ? formData.price : formData.price.split(' ')[0].replaceAll(',', '');
        formData.tourPictures = formData.imageUrl;
        formData.startDate =
            formData.startDay || formData.startDate.split(' ')[0] + ' ' + (formData.startTime || '00:00:00');
        if (update)
            updateTour(formData, formData.idTour).then((rs) => {
                if (rs.status) setTourData(formData);
            });
        else {
            addTour(formData).then((rs) => {
                if (rs.status) {
                    let tour = {...formData, idTour: rs.data[0].idTour};
                    let newListTour = [...listTour, tour];
                    setListTour(newListTour);
                }
            });
        }
    };
    return (
        <form className={css['tour-form'] + ' col-wrapper'} onSubmit={handleSubmit}>
            <div className='row-wrapper'>
                <div className={css['img-col']}>
                    <label htmlFor='file'>
                        <img src={formData.imageUrl[0] || ''} alt='' className={css['big-display']} />
                        <input type='file' id='file' onChange={handleFileChange} style={{display: 'none'}} />
                    </label>
                    <div className='row-wrapper flex-align-l'>
                        {formData.imageUrl.map((e) => (
                            <img src={e} alt='' className={css['small-display']} />
                        ))}
                    </div>
                </div>
                <div className='col-wrapper pad-0-12 w--30 flex-align-l'>
                    <label className='mt--0'>Tên tour</label>
                    <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
                    <label>Ngày bắt đầu</label>
                    <input
                        type='date'
                        name='startDay'
                        value={formData.startDay || formData.startDate.split(' ')[0]}
                        onChange={handleInputChange}
                    />
                    <label>Giờ khởi hành: </label>
                    <input
                        type='time'
                        name='startTime'
                        value={formData.startTime || formData.startDate.split(' ')[1]}
                        onChange={handleInputChange}
                    />
                    <label>Độ dài(ngày)</label>
                    <input
                        min='0'
                        type='number'
                        name='totalDay'
                        value={formData.totalDay}
                        onChange={handleInputChange}
                        className='w--30'
                    />
                    <label>Điểm đón</label>
                    <Address formData={formData} name='pickUpPoint' handleInputChange={handleInputChange} />
                    <label>Điểm đến</label>
                    <Address formData={formData} name='tourDestination' handleInputChange={handleInputChange} />
                    <div className='row-wrapper flex-align-c flex-align-l'>
                        <input
                            type='checkbox'
                            name='featured'
                            style={{width: '20px', marginBottom: '0'}}
                            checked={formData.featured}
                            onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        />
                        <label htmlFor='tour-guide'>Tour nổi bật!</label>
                    </div>
                </div>
                <div className='col-wrapper pad-0-12 w--30  flex-align-l '>
                    <label>Chi tiết điểm đón</label>
                    <input
                        type='text'
                        name='detailPickUpPoint'
                        value={formData.detailPickUpPoint}
                        onChange={handleInputChange}
                    />
                    <label>Chi tiết điểm đến</label>
                    <input
                        type='text'
                        name='detailTourDestination'
                        value={formData.detailTourDestination}
                        onChange={handleInputChange}
                    />
                    <div className='row-wrapper'>
                        <div className='col-wrapper flex-align-l'>
                            <label className='mt--0'>Số người tối thiểu</label>
                            <input
                                min='0'
                                type='number'
                                className='w--50'
                                name='minQuantity'
                                value={formData.minQuantity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='col-wrapper flex-align-l'>
                            <label className='mt--0'>Số người tối đa</label>
                            <input
                                min='0'
                                type='number'
                                name='maxQuantity'
                                className='w--50'
                                value={formData.maxQuantity}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row-wrapper'>
                        <div className='col-wrapper flex-align-l'>
                            <label>Phí hủy mức 1(%)</label>
                            <input
                                min='0'
                                type='number'
                                name='normalPenaltyFee'
                                className='w--50'
                                value={formData.normalPenaltyFee}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='col-wrapper flex-align-l'>
                            <label>Phí hủy mức 2</label>
                            <input
                                min='0'
                                type='number'
                                name='strictPenaltyFee'
                                className='w--50'
                                value={formData.strictPenaltyFee}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <label>Thời điểm áp dụng phí hủy mức 2:</label>
                    <div className='row-wrapper flex-align-l'>
                        <input
                            min='0'
                            type='number'
                            name='minDate'
                            className='w--20'
                            value={formData.minDate}
                            onChange={handleInputChange}
                        />
                        <label className='mt--0 ml--12'> ngày trước ngày khởi hành</label>
                    </div>
                    <label>Đơn giá</label>

                    <CurrencyInput
                        name='price'
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder='$0.00'
                        type='text'
                    />
                    <div className='row-wrapper flex-align-c flex-align-l'>
                        <input
                            type='checkbox'
                            name='tourGuide'
                            style={{width: '20px', marginBottom: '0'}}
                            checked={formData.tourGuide}
                            onChange={(e) => setFormData({...formData, tourGuide: e.target.checked})}
                        />
                        <label htmlFor='tour-guide'>Hướng dẫn viên</label>
                    </div>
                </div>
            </div>
            <div className='row-wrapper flex-align-l'>
                <div className='col-wrapper w--30 flex-align-l'>
                    <label>Giới thiệu</label>
                    <textarea
                        name='tourIntro'
                        cols={30}
                        rows={10}
                        className='intro'
                        value={formData.tourIntro}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='col-wrapper ml--12 w--100 flex-align-l'>
                    <label>Chi tiết</label>
                    <textarea
                        name='tourDetail'
                        className='detail'
                        value={formData.tourDetail}
                        onChange={handleInputChange}
                        rows={10}
                    />
                </div>
            </div>
            <button type='submit' className='btn--gold' style={{marginBottom: 'auto', marginTop: '24px'}}>
                Lưu
            </button>
        </form>
    );
}

export default TourForm;
