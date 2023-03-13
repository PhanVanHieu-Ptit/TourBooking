import css from './style.module.css';
import calendarSvg from '../../assets/svg/calendar.svg';
import moneySvg from '../../assets/svg/money.svg';
import hourglassSvg from '../../assets/svg/hourglass.svg';
import tourGuideSvg from '../../assets/svg/tour-guide.svg';
import destinationSvg from '../../assets/svg/destination.svg';
import groupPersonSvg from '../../assets/svg/group-person.svg';

function BookedToursClient() {
    console.log(css);
    return (
        <div className={css['booked-tours-client']}>
            <div className={css.tour}>
                <img src='https://i.ibb.co/PY4KVHX/tour3.jpg' alt='' className={css.bg} />
                <div className={css.details}>
                    <div className={css.heading}>
                        <i className={css.id}> #idTours</i>
                        <p className={css.name}>Đà lạt 3 ngày 2 đêm bao phòng</p>
                    </div>
                    <div className={css.body}>
                        <button className='btn--gold'>Hủy đặt</button>
                        <div className={css.wrapper}>
                            <div className={css.detail}>
                                <img src={calendarSvg} alt='' />
                                <p className={css.title}>Ngày đặt:</p>
                                <p className={css.value}>05/09/2001</p>
                            </div>
                            <div className={css.detail}>
                                <img src={calendarSvg} alt='' />
                                <p className={css.title}>Ngày khởi hành:</p>
                                <p className={css.value}>05/09/2001</p>
                            </div>
                        </div>
                        <div className={css.wrapper}>
                            <div className={css.detail}>
                                <img src={destinationSvg} alt='' />
                                <p className={css.title}>Điểm đón:</p>
                                <p className={css.value}>Tp.Hồ Chí Minh</p>
                            </div>
                            <div className={css.detail}>
                                <img src={destinationSvg} alt='' />
                                <p className={css.title}>Điểm đến:</p>
                                <p className={css.value}>Đà Lạt</p>
                            </div>
                        </div>
                        <div className={css.wrapper}>
                            <div className={css.detail}>
                                <img src={hourglassSvg} alt='' />
                                <p className={css.title}>Độ dài:</p>
                                <p className={css.value}>3 ngày</p>
                            </div>
                            <div className={css.detail}>
                                <img src={tourGuideSvg} alt='' />
                                <p className={css.title}>Hướng dẫn viên:</p>
                                <p className={css.value}>Có</p>
                            </div>
                        </div>
                        <div className={css.wrapper}>
                            <div className={css.detail}>
                                <img src={groupPersonSvg} alt='' />
                                <p className={css.title}>Số chỗ đặt:</p>
                                <p className={css.value}>3</p>
                            </div>
                            <div className={css.detail}>
                                <img src={moneySvg} alt='' />
                                <p className={css.title}>Tổng tiền:</p>
                                <p className={css.value}>10.000.000 VNĐ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookedToursClient;
