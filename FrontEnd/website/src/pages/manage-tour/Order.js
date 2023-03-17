function Order() {
    return (
        <div className='popup booking-popup' style={{display: 'none'}}>
            <div className='popup-content w--80'>
                <div className='popup-heading'>Danh sách đơn đặt</div>
                <img className='popup-btn-close' src='../shared/close.svg' />
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
                                <img src='../shared/drop-down.svg' alt='' />
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
                        <tr className='value'>
                            <td>
                                <img src='../shared/drop-down.svg' alt='' />
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
                        <tr className='value'>
                            <td>
                                <img src='../shared/drop-down.svg' alt='' />
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
                            <td className='booked-tour-note'>
                                <label htmlFor className='text-left'>
                                    Ghi chú
                                </label>
                                <p name id>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero ipsam distinctio
                                    assumenda vero sed iste illum vel, facere possimus corrupti quas eveniet, quaerat
                                    illo exercitationem iure harum. Reiciendis, aut dolorem. Lorem ipsum dolor, sit amet
                                    consectetur adipisicing elit. Libero ipsam distinctio assumenda vero sed iste illum
                                    vel, facere possimus corrupti quas eveniet, quaerat illo exercitationem iure harum.
                                    Reiciendis, aut dolorem.
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Order;
