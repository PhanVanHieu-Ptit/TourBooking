import TourDetail from './TourDetail';
import svg from './../../assets/svg/index';
import {useState} from 'react';
import formatMoney from './../../utils/formatMoney';
import Popup from './../../components/Popup';
import TourForm from './TourForm';
import OrderOfTour from './OrderOfTour';
import formatDate from './../../utils/formatDate';
import css from './style.module.css';
import {cancelTour} from '../../utils/services';
function TourRowData({tour}) {
    console.log('tourRowData');
    const [showDetail, setShowDetail] = useState(false);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [showOrderOfTourPopup, setShowOrderOfTourPopup] = useState(false);
    const [tourData, setTourData] = useState(tour);
    let typeStatus = 'status-green';

    if (tourData.status.idStatus == 2 || tourData.status.idStatus == 3) typeStatus = 'status-red';
    const handleCancelTour = () => {
        cancelTour(tourData.idTour).then((rs) => {
            if (rs.status) setTourData({...tourData, status: {idStatus: 2, name: 'Đã hủy'}});
        });
    };
    return (
        <>
            <tr className='value'>
                <td style={{width: '40px'}} onClick={() => setShowDetail(!showDetail)}>
                    <img src={svg.dropDown} alt='' />
                </td>
                <td className='id-value'>#{tourData.idTour}</td>
                <td>{tourData.name}</td>
                <td>{formatDate(tourData.dateCreate)[1]}</td>
                <td>{tourData.tourDestination}</td>
                <td>
                    <p className={typeStatus}>{tourData.status.name}</p>
                </td>
                <td>{formatMoney(tourData.price)}</td>
                <td className='options'>
                    <div className={css['has-request-count']}>
                        {tourData.requestCount && <span>{tourData.requestCount}</span>}
                        <img src={svg.list} alt='' className='option' onClick={() => setShowOrderOfTourPopup(true)} />
                    </div>
                    <img src={svg.edit} alt='' className='option' onClick={() => setShowUpdatePopup(true)} />
                    <img src={svg.lock} alt='' className='option' onClick={() => handleCancelTour()} />
                </td>
            </tr>
            {showDetail && (
                <tr>
                    <TourDetail tourData={tourData} />
                </tr>
            )}
            {showUpdatePopup && (
                <Popup
                    name='Cập nhật tour'
                    content={<TourForm tourData={tourData} setTourData={setTourData} />}
                    onClose={() => setShowUpdatePopup(false)}
                />
            )}
            {showOrderOfTourPopup && (
                <Popup
                    name='Danh sách yêu cầu của tour'
                    content={<OrderOfTour tourData={tourData} setTourData={setTourData} />}
                    onClose={() => setShowOrderOfTourPopup(false)}
                />
            )}
        </>
    );
}

export default TourRowData;
