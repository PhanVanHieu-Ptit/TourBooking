import TourDetail from './TourDetail';
import svg from './../../assets/svg/index';
import {useState} from 'react';
import formatMoney from './../../utils/formatMoney';
function TourRowData({tourData}) {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <tr className='value'>
                <td style={{width: '40px'}} onClick={() => setShowDetail(!showDetail)}>
                    <img src={svg.dropDown} alt='' />
                </td>
                <td className='id-value'>#{tourData.idTour}</td>
                <td>{tourData.name}</td>
                <td>{tourData.startDate}</td>
                <td>{tourData.tourDestination}</td>
                <td>
                    <p className='status-green'>Hiện hành</p>
                </td>
                <td>{formatMoney(tourData.price)}</td>
                <td className='options'>
                    <img src={svg.list} alt='' className='option' />
                    <img src={svg.edit} alt='' className='option' />
                    <img src={svg.lock} alt='' className='option' />
                </td>
            </tr>
            {showDetail && (
                <tr>
                    <TourDetail tourData={tourData} />
                </tr>
            )}
        </>
    );
}

export default TourRowData;
