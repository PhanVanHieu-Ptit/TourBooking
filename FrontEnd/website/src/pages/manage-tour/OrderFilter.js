function OrderFilter({status}) {
    return (
        <select className='filter mt--18'>
            <option>Tất cả</option>
            <option>Chờ xác nhận đặt</option>
            <option>Đã hủy </option>
            <option>Đang sử dụng </option>
            <option>Đặt thành công</option>
            <option>Hoàn thành </option>
            <option>Yêu cầu hủy</option>
        </select>
    );
}

export default OrderFilter;
