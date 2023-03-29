import svg from '../../assets/svg/index';
import formatMoney from './../../utils/formatMoney';
import formatDate from './../../utils/formatDate';

function OrderOfTourRowData({orderOfTour, handleConfirm}) {
    return (
        <tr className='value'>
            <td className='id-value' style={{width: '30px'}}>
                #{orderOfTour.customer.idCustomer}
            </td>
            <td>{orderOfTour.customer.name}</td>
            <td>{orderOfTour.customer.phoneNumber}</td>
            <td>{orderOfTour.quantity}</td>
            <td style={{width: '100px'}}>
                {formatDate(orderOfTour.orderDateTime)[1] + '\n' + formatDate(orderOfTour.orderDateTime)[2]}
            </td>
            <td style={{width: '160px'}}>
                {(orderOfTour.status.idStatus == 8 ||
                    orderOfTour.status.idStatus == 9 ||
                    orderOfTour.status.idStatus == 12 ||
                    orderOfTour.status.idStatus == 13) && <p className='status-green '>{orderOfTour.status.name}</p>}
                {(orderOfTour.status.idStatus == 10 || orderOfTour.status.idStatus == 11) && (
                    <p className='status-red '>{orderOfTour.status.name}</p>
                )}
            </td>
            <td style={{width: '100px'}}>
                {formatDate(orderOfTour.cancelDate)[1] + '\n' + formatDate(orderOfTour.cancelDate)[2]}
            </td>
            <td> {formatMoney(orderOfTour.totalMoney)} </td>
            <td className='options' style={{width: '140px'}}>
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
