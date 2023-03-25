import calendarSvg from '../../assets/svg/calendar.svg';
import hourglassSvg from '../../assets/svg/hourglass.svg';
import groupPersonSvg from '../../assets/svg/group-person.svg';
import destinationSvg from '../../assets/svg/destination.svg';
import tourGuideSvg from '../../assets/svg/tour-guide.svg';
import moneySvg from '../../assets/svg/money.svg';
import css from './style.module.css';
import formatMoney from '../../utils/formatMoney';
import formatDate from '../../utils/formatDate';
function MainDetail({memoizedOptions}) {
    const data = memoizedOptions;
    return (
        <div className={css['main-details']}>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Ngày khởi hành</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={calendarSvg} />
                    <div className={css['main-detail-value']}>{formatDate(data.startDate)[1]}</div>
                </div>
            </div>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Độ dài</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={hourglassSvg} />
                    <div className={css['main-detail-value']}>{data.totalDay} ngày</div>
                </div>
            </div>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Số chỗ còn lại</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={groupPersonSvg} />
                    <div className={css['main-detail-value']}>{data.slotsLeft} người</div>
                </div>
            </div>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Điểm đón khách</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={destinationSvg} />
                    <div className={css['main-detail-value']}>{data.pickUpPoint}</div>
                </div>
            </div>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Hướng dẫn viên</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={tourGuideSvg} />
                    <div className={css['main-detail-value']}>{data.tourGuide ? 'Có' : 'Không'}</div>
                </div>
            </div>
            <div className={css['main-detail']}>
                <p className={css['main-detail-heading']}>Giá</p>
                <div className={css['main-detail-wrapper']}>
                    <img className={css['main-detail-icon']} src={moneySvg} />
                    <div className={css['main-detail-value']}>{formatMoney(data.price)}</div>
                </div>
            </div>
        </div>
    );
}

export default MainDetail;
