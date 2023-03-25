import svg from '../../assets/svg/index';
import formatMoney from './../../utils/formatMoney';
import formatDate from './../../utils/formatDate';

function OrderOfTourRowData({orderOfTour, handleConfirm}) {
    return (
        <tr className='value'>
            <td>
                <img src={svg.dropDown} alt='' />
            </td>
            <td className='id-value'>#{orderOfTour.customer.idCustomer}</td>
            <td>{orderOfTour.customer.name}</td>
            <td>{orderOfTour.customer.phoneNumber}</td>
            <td>{orderOfTour.quantity}</td>
            <td>{formatDate(orderOfTour.orderDateTime)[1]}</td>
            <td>
                {(orderOfTour.status.idStatus == 8 ||
                    orderOfTour.status.idStatus == 9 ||
                    orderOfTour.status.idStatus == 12 ||
                    orderOfTour.status.idStatus == 13) && <p className='status-green '>{orderOfTour.status.name}</p>}
                {(orderOfTour.status.idStatus == 10 || orderOfTour.status.idStatus == 11) && (
                    <p className='status-red '>{orderOfTour.status.name}</p>
                )}
            </td>
            <td> {formatMoney(orderOfTour.totalMoney)} </td>
            <td className='options'>
                {orderOfTour.status.idStatus == 8 && (
                    <div className='btn-green' onClick={(e) => handleConfirm('order', orderOfTour.index)}>
                        Xác nhận đặt
                    </div>
                )}
                {orderOfTour.status.idStatus == 10 && (
                    <div className='btn-red' onClick={(e) => handleConfirm('cancel', orderOfTour.index)}>
                        Xác nhận hủy
                    </div>
                )}
            </td>
        </tr>
    );
}

export default OrderOfTourRowData;
