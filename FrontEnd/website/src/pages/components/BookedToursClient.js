import css from './style.module.css';
import React, {useState, useEffect} from 'react';
import {getListOrderTour, getOwnInfor, requestCancelTour} from '../../utils/services';
import formatMoney from '../../utils/formatMoney';
import svg from './../../assets/svg/index';
import formatDate from './../../utils/formatDate';

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
                            <img src={e.tour.imageUrl[0]} alt='img' className={css.bg} />
                            <div className={css['details-container']}>
                                <div className={css.heading}>
                                    <p className={css.name}>{e.tour.name}</p>
                                    <i className={css.id}>
                                        #{e.tour.idTour} - Trạng thái: {e.status.name}
                                    </i>
                                </div>
                                <div className={css['details-body']}>
                                    {(e.status.idStatus == 9 || e.status.idStatus == 8) && (
                                        <button
                                            className='btn--gold'
                                            onClick={() => handleCancelTour(e.idTourOrder, i)}>
                                            Hủy đặt
                                        </button>
                                    )}
                                    <div className={css.wrapper}>
                                        <div className={css.detail}>
                                            <img src={svg.calendar} alt='img' />
                                            <p className={css.title}>Ngày đặt:</p>
                                            <p className={css.value}>{formatDate(e.orderDateTime)[1]}</p>
                                        </div>
                                        <div className={css.detail}>
                                            <img src={svg.calendar} alt='img' />
                                            <p className={css.title}>Ngày khởi hành:</p>
                                            <p className={css.value}>{formatDate(e.tour.startDate)[1]}</p>
                                        </div>
                                    </div>
                                    <div className={css.wrapper}>
                                        <div className={css.detail}>
                                            <img src={svg.destination} alt='img' />
                                            <p className={css.title}>Điểm đón:</p>
                                            <p className={css.value}>{e.tour.pickUpPoint}</p>
                                        </div>
                                        <div className={css.detail}>
                                            <img src={svg.destination} alt='img' />
                                            <p className={css.title}>Điểm đến:</p>
                                            <p className={css.value}>{e.tour.tourDestination}</p>
                                        </div>
                                    </div>
                                    <div className={css.wrapper}>
                                        <div className={css.detail}>
                                            <img src={svg.hourglass} alt='img' />
                                            <p className={css.title}>Độ dài:</p>
                                            <p className={css.value}>{e.tour.totalDay} ngày</p>
                                        </div>
                                        <div className={css.detail}>
                                            <img src={svg.tourGuide} alt='img' />
                                            <p className={css.title}>Hướng dẫn viên:</p>
                                            <p className={css.value}>{e.tour.tourGuide ? 'Có' : 'Không'}</p>
                                        </div>
                                    </div>
                                    <div className={css.wrapper}>
                                        <div className={css.detail}>
                                            <img src={svg.groupPerson} alt='img' />
                                            <p className={css.title}>Số chỗ đặt:</p>
                                            <p className={css.value}>{e.quantity}</p>
                                        </div>
                                        <div className={css.detail}>
                                            <img src={svg.money} alt='img' />
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
