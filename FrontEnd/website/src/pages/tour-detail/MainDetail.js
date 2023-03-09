import calendarSvg from '../../assets/svg/calendar.svg';
import hourglassSvg from '../../assets/svg/hourglass.svg';
import groupPersonSvg from '../../assets/svg/group-person.svg';
import destinationSvg from '../../assets/svg/destination.svg';
import tourGuideSvg from '../../assets/svg/tour-guide.svg';
import moneySvg from '../../assets/svg/money.svg';
function MainDetail() {
    return (
        <div className='main-details'>
            <div className='main-detail'>
                <p className='main-detail-heading'>Ngày khởi hành</p>
                <div className='main-detail-wrapper'>
                    <img className='main-detail-icon' src={calendarSvg} />
                    <div className='main-detail-value start-date'>05/09/2001</div>
                </div>
            </div>
            <div className='main-detail'>
                <p className='main-detail-heading'>Độ dài</p>
                <div className='main-detail-wrapper'>
                    <img className='main-detail-icon' src={hourglassSvg} />
                    <div className='main-detail-value duration'>3 ngày</div>
                </div>
            </div>
            <div className='main-detail'>
                <p className='main-detail-heading'>Số chỗ còn lại</p>
                <div className='main-detail-wrapper'>
                    <img className='main-detail-icon' src={groupPersonSvg} />
                    <div className='main-detail-value quantity-left'>4 người</div>
                </div>
            </div>
            <div className='main-detail'>
                <p className='main-detail-heading'>Điểm đón khách</p>
                <div className='main-detail-wrapper'>
                    <img className='main-detail-icon' src={destinationSvg} />
                    <div className='main-detail-value pick-up-place'>Tp.Hồ Chí Minh</div>
                </div>
            </div>
            <div className='main-detail'>
                <p className='main-detail-heading'>Hướng dẫn viên</p>
                <div className='main-detail-wrapper'>
                    <img className='main-detail-icon' src={tourGuideSvg} />
                    <div className='main-detail-value pick-up-place'>Có</div>
                </div>
            </div>
            <div className='main-detail'>
                <p className='main-detail-heading'>Giá</p>
                <div className='main-detail-wrapper'>
                    <img className='main-detail-icon' src={moneySvg} />
                    <div className='main-detail-value price'>9.000.000 VNĐ</div>
                </div>
            </div>
        </div>
    );
}

export default MainDetail;
