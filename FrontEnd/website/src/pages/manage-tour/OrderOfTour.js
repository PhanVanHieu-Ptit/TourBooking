import {useState} from 'react';
import {useEffect} from 'react';
import OrderOfTourRowData from './OrderOfTourRowData';
import {confirmCancelTour, confirmOrderTour, getListOrderOfTour} from '../../utils/services';

function OrderOfTour({tourData}) {
    const [listOrderOfTour, setListOrderOfTour] = useState([]);

    useEffect(() => {
        getListOrderOfTour(tourData.idTour).then((rs) => setListOrderOfTour(rs.data));
    }, []);

    const handleConfirm = (action, index) => {
        console.log(index);

        if (action == 'order') {
            confirmOrderTour(listOrderOfTour[index].idTourOrder).then((rs) => {
                rs.status && getListOrderOfTour(tourData.idTour).then((rs) => setListOrderOfTour(rs.data));
            });
        }
        if (action == 'cancel') {
            confirmCancelTour(listOrderOfTour[index].idTourOrder).then((rs) => {
                rs.status && getListOrderOfTour(tourData.idTour).then((rs) => setListOrderOfTour(rs.data));
            });
        }
    };
    return (
        <>
            <div className='row-wrapper'>
                <div>
                    <p className='id-value'>#{tourData.idTour}</p>
                    <h3>{tourData.name}</h3>
                </div>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>ID KH</th>
                        <th>HỌ TÊN</th>
                        <th>SỐ ĐIỆN THOẠI</th>
                        <th>SỐ CHỖ ĐẶT</th>
                        <th>NGÀY ĐẶT</th>
                        <th>TRẠNG THÁI</th>
                        <th>TỔNG TIỀN</th>
                        <th>GHI CHÚ</th>
                        <th />
                    </tr>
                    {listOrderOfTour.map((e, i) => {
                        return (
                            <OrderOfTourRowData orderOfTour={{index: i, ...e}} handleConfirm={handleConfirm} key={i} />
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default OrderOfTour;
