import css from './style.module.css';
import calendarSvg from '../../assets/svg/calendar.svg';
import moneySvg from '../../assets/svg/money.svg';
import hourglassSvg from '../../assets/svg/hourglass.svg';
import tourGuideSvg from '../../assets/svg/tour-guide.svg';
import destinationSvg from '../../assets/svg/destination.svg';
import groupPersonSvg from '../../assets/svg/group-person.svg';
import React, {useState, useEffect} from 'react';
import {orderedTour} from '../../utils/services';
import formatMoney from '../../utils/formatMoney';

function BookedToursClient() {
    const [tours, setTours] = useState([]);
    useEffect(() => {
        orderedTour().then((rs) => setTours(rs.data));
    }, []);
    return (
        <div className={css['booked-tours-client']}>
            {tours.map((e, i) => {
                return (
                    <div className={css.tour} key={i}>
                        <img src='https://i.ibb.co/PY4KVHX/tour3.jpg' alt='' className={css.bg} />
                        <div className={css.details}>
                            <div className={css.heading}>
                                <i className={css.id}>#{e.idTour}</i>
                                <p className={css.name}>{e.name}</p>
                            </div>
                            <div className={css.body}>
                                <button className='btn--gold'>Hủy đặt</button>
                                <div className={css.wrapper}>
                                    <div className={css.detail}>
                                        <img src={calendarSvg} alt='' />
                                        <p className={css.title}>Ngày đặt:</p>
                                        <p className={css.value}>{e.orderDateTime}</p>
                                    </div>
                                    <div className={css.detail}>
                                        <img src={calendarSvg} alt='' />
                                        <p className={css.title}>Ngày khởi hành:</p>
                                        <p className={css.value}>{e.startDate}</p>
                                    </div>
                                </div>
                                <div className={css.wrapper}>
                                    <div className={css.detail}>
                                        <img src={destinationSvg} alt='' />
                                        <p className={css.title}>Điểm đón:</p>
                                        <p className={css.value}>{e.pickUpPoint}</p>
                                    </div>
                                    <div className={css.detail}>
                                        <img src={destinationSvg} alt='' />
                                        <p className={css.title}>Điểm đến:</p>
                                        <p className={css.value}>{e.tourDestination}</p>
                                    </div>
                                </div>
                                <div className={css.wrapper}>
                                    <div className={css.detail}>
                                        <img src={hourglassSvg} alt='' />
                                        <p className={css.title}>Độ dài:</p>
                                        <p className={css.value}>{e.totalDay} ngày</p>
                                    </div>
                                    <div className={css.detail}>
                                        <img src={tourGuideSvg} alt='' />
                                        <p className={css.title}>Hướng dẫn viên:</p>
                                        <p className={css.value}>{e.tourGuide ? 'Có' : 'Không'}</p>
                                    </div>
                                </div>
                                <div className={css.wrapper}>
                                    <div className={css.detail}>
                                        <img src={groupPersonSvg} alt='' />
                                        <p className={css.title}>Số chỗ đặt:</p>
                                        <p className={css.value}>{e.quantity}</p>
                                    </div>
                                    <div className={css.detail}>
                                        <img src={moneySvg} alt='' />
                                        <p className={css.title}>Tổng tiền:</p>
                                        <p className={css.value}>{formatMoney(e.totalMoney)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default BookedToursClient;
