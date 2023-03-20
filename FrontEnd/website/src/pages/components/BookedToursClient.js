import css from './style.module.css';
import calendarSvg from '../../assets/svg/calendar.svg';
import moneySvg from '../../assets/svg/money.svg';
import hourglassSvg from '../../assets/svg/hourglass.svg';
import tourGuideSvg from '../../assets/svg/tour-guide.svg';
import destinationSvg from '../../assets/svg/destination.svg';
import groupPersonSvg from '../../assets/svg/group-person.svg';
import React, {useState, useEffect} from 'react';
import {getListOrderTour, getOwnInfor, requestCancelTour} from '../../utils/services';
import formatMoney from '../../utils/formatMoney';

function BookedToursClient() {
    const [tours, setTours] = useState();
    useEffect(() => {
        getOwnInfor().then((rs) => {
            getListOrderTour(rs.data[0].idCustomer).then((rs) => setTours(rs.data));
        });
    }, []);
    const handleCancelTour = (idTourOrder, index) => {
        requestCancelTour(idTourOrder).then((rs) => {
            if (rs.status) {
                getOwnInfor().then((rs) => {
                    getListOrderTour(rs.data[0].idCustomer).then((rs) => setTours(rs.data));
                });
            }
        });
    };
    return (
        <div className={css['booked-tours-client']}>
            {tours &&
                tours.map((e, i) => {
                    return (
                        <div className={css.tour} key={i}>
                            <img src={e.tour.imageUrl[0]} alt='' className={css.bg} />
                            <div className={css.details}>
                                <div className={css.heading}>
                                    <i className={css.id}>
                                        #{e.tour.idTour} - Trạng thái: {e.status.name}
                                    </i>
                                    <p className={css.name}>{e.tour.name}</p>
                                </div>
                                <div className={css.body}>
                                    {(e.status.idStatus == 9 || e.status.idStatus == 8) && (
                                        <button
                                            className='btn--gold'
                                            onClick={() => handleCancelTour(e.idTourOrder, i)}>
                                            Hủy đặt
                                        </button>
                                    )}
                                    <div className={css.wrapper}>
                                        <div className={css.detail}>
                                            <img src={calendarSvg} alt='' />
                                            <p className={css.title}>Ngày đặt:</p>
                                            <p className={css.value}>{e.tour.orderDateTime}</p>
                                        </div>
                                        <div className={css.detail}>
                                            <img src={calendarSvg} alt='' />
                                            <p className={css.title}>Ngày khởi hành:</p>
                                            <p className={css.value}>{e.tour.startDate}</p>
                                        </div>
                                    </div>
                                    <div className={css.wrapper}>
                                        <div className={css.detail}>
                                            <img src={destinationSvg} alt='' />
                                            <p className={css.title}>Điểm đón:</p>
                                            <p className={css.value}>{e.tour.pickUpPoint}</p>
                                        </div>
                                        <div className={css.detail}>
                                            <img src={destinationSvg} alt='' />
                                            <p className={css.title}>Điểm đến:</p>
                                            <p className={css.value}>{e.tour.tourDestination}</p>
                                        </div>
                                    </div>
                                    <div className={css.wrapper}>
                                        <div className={css.detail}>
                                            <img src={hourglassSvg} alt='' />
                                            <p className={css.title}>Độ dài:</p>
                                            <p className={css.value}>{e.tour.totalDay} ngày</p>
                                        </div>
                                        <div className={css.detail}>
                                            <img src={tourGuideSvg} alt='' />
                                            <p className={css.title}>Hướng dẫn viên:</p>
                                            <p className={css.value}>{e.tour.tourGuide ? 'Có' : 'Không'}</p>
                                        </div>
                                    </div>
                                    <div className={css.wrapper}>
                                        <div className={css.detail}>
                                            <img src={groupPersonSvg} alt='' />
                                            <p className={css.title}>Số chỗ đặt:</p>
                                            <p className={css.value}>{e.tour.quantity}</p>
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
