import calendarSvg from '../../assets/svg/calendar.svg';
import hourglassSvg from '../../assets/svg/hourglass.svg';
import groupPersonSvg from '../../assets/svg/group-person.svg';
import destinationSvg from '../../assets/svg/destination.svg';
import tourGuideSvg from '../../assets/svg/tour-guide.svg';
import moneySvg from '../../assets/svg/money.svg';
import css from './style.module.css';
function MainDetail() {
    return (
        <div className={css['main-details']}>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Ngày khởi hành</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={calendarSvg} />
                    <div className={css['main-detail-value']}>05/09/2001</div>
                </div>
            </div>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Độ dài</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={hourglassSvg} />
                    <div className={css['main-detail-value']}>3 ngày</div>
                </div>
            </div>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Số chỗ còn lại</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={groupPersonSvg} />
                    <div className={css['main-detail-value']}>4 người</div>
                </div>
            </div>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Điểm đón khách</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={destinationSvg} />
                    <div className={css['main-detail-value']}>Tp.Hồ Chí Minh</div>
                </div>
            </div>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Hướng dẫn viên</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={tourGuideSvg} />
                    <div className={css['main-detail-value']}>Có</div>
                </div>
            </div>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Giá</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={moneySvg} />
                    <div className={css['main-detail-value']}>9.000.000 VNĐ</div>
                </div>
            </div>
        </div>
    );
}

export default MainDetail;
