import css from './style.module.css';
import React, {useState, useEffect} from 'react';
import {customerCancelTour, getListOrderTour, getOwnInfor, requestCancelTour} from '../../utils/services';
import formatMoney from '../../utils/formatMoney';
import svg from './../../assets/svg/index';
import formatDate from './../../utils/formatDate';
import {toast} from 'react-toastify';

function BookedToursClient() {
    const [listTour, setListTour] = useState();
    const [paging, setPaging] = useState(1);

    useEffect(() => {
        getOwnInfor().then((rs) => {
            getListOrderTour(rs.data[0].idCustomer).then((rs) => setListTour(rs.data));
        });
    }, []);
    const handleRequestCancelTour = (idTourOrder, index) => {
        requestCancelTour(idTourOrder).then((rs) => {
            if (rs.status) {
                getOwnInfor().then((rs) => {
                    getListOrderTour(rs.data[0].idCustomer).then((rs) => setListTour(rs.data));
                });
            }
        });
    };
    const handleCustomerCancelTour = (idTourOrder, index) => {
        customerCancelTour(idTourOrder).then((rs) => {
            if (rs.status) {
                getOwnInfor().then((rs) => {
                    getListOrderTour(rs.data[0].idCustomer).then((rs) => setListTour(rs.data));
                });
            }
        });
    };

    const handleLoadData = () => {
        setPaging(paging + 1);
        getOwnInfor().then((rs) => {
            getListOrderTour(rs.data[0].idCustomer, paging + 1).then((rs) => {
                if (!rs.data.length) return toast.warning('Không còn dữ liệu!');
                setListTour(listTour.concat(rs.data));
            });
        });
    };
    return (
        <div className={css['booked-tours-client']}>
            {listTour &&
                listTour.map((e, i) => {
                    return (
                        <div className={css.tour} key={i}>
                            <img src={e.tour.imageUrl[0]} alt='img' className={css.bg} />
                            <div className={css['details-container']}>
                                <div className={css.heading}>
                                    <p className={css.name}>{e.tour.name}</p>
                                    <i className={css.id}>
                                        #{e.tour.idTour} - Trạng thái:{' '}
                                        <span
                                            style={{
                                                backgroundColor: 'var(--gold)',
                                                padding: '0px 12px',
                                                borderRadius: '12px',
                                            }}>
                                            {e.status.name}
                                        </span>
                                    </i>
                                </div>
                                <div className={css['details-body']}>
                                    {e.status.idStatus == 9 && (
                                        <button
                                            className='btn--gold'
                                            onClick={() => handleRequestCancelTour(e.idTourOrder, i)}>
                                            Yêu cầu hủy đặt
                                        </button>
                                    )}
                                    {e.status.idStatus == 8 && (
                                        <button
                                            className='btn--gold'
                                            onClick={() => handleCustomerCancelTour(e.idTourOrder, i)}>
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

            <p onClick={handleLoadData} className='mt--12' style={{textAlign: 'center', cursor: 'pointer'}}>
                Xem thêm
            </p>
        </div>
    );
}

export default BookedToursClient;
