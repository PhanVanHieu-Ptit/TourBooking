import svg from '../../assets/svg/index';
import {useState} from 'react';
import {useEffect} from 'react';

function OrderOfTour({tourData}) {
    return (
        <>
            <div className='row-wrapper'>
                <div>
                    <p className='id-value'>#idTour</p>
                    <h3>Tour 3 ngày 1 đêm</h3>
                </div>
                <select name id className='filter mt--18'>
                    <option value>Chờ xác nhận</option>
                    <option value>Chờ hủy</option>
                    <option value>Đã hủy</option>
                </select>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th />
                        <th>ID KH</th>
                        <th>HỌ TÊN</th>
                        <th>SỐ ĐIỆN THOẠI</th>
                        <th>SỐ NGƯƠI</th>
                        <th>NGÀY ĐẶT</th>
                        <th>TRẠNG THÁI</th>
                        <th>TỔNG TIỀN</th>
                        <th />
                    </tr>
                    <tr className='value'>
                        <td>
                            <img src={svg.dropDown} alt='' />
                        </td>
                        <td className='id-value'>#id</td>
                        <td>Nguyễn Văn A</td>
                        <td>0973343599</td>
                        <td>2</td>
                        <td>20/11/2023</td>
                        <td>
                            <p className='status-green '>Hiện hành</p>
                        </td>
                        <td>2.000.000 VNĐ</td>
                        <td className='options'>
                            <div className='btn-red'>Xác nhận huỷ</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default OrderOfTour;
