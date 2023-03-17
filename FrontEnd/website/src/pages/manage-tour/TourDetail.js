import svg from '../../assets/svg';
import css from './style.module.css';
function TourDetail({tourData}) {
    return (
        <>
            <td className={css['tour-details']}>
                <img src={tourData.imageUrl[0]} alt='' className='bg' />
                <div className='row-wrapper'>
                    <div className='row-wrapper pad-0-12 w--30 images'>
                        <img src='../shared/img/tour2.jpg' alt='' className='small-display' />
                        {tourData.imageUrl.map((e) => (
                            <img src={e} alt='' className='small-display' />
                        ))}
                    </div>
                    <div className='col-wrapper pad-0-12 w--30'>
                        <div className='row-wrapper'>
                            <img src={svg.hourglass} className='icon' alt='' />
                            <label htmlFor>Độ dài(ngày)</label>
                            <span htmlFor className='value'>
                                {tourData.totalDay} ngày
                            </span>
                        </div>
                        <div className='row-wrapper'>
                            <img src={svg.destinationBlack} className='icon' alt='' />
                            <label htmlFor>Điểm đón</label>
                            <span htmlFor className='value'>
                                {tourData.pickUpPoint}
                            </span>
                        </div>
                        <div className='row-wrapper'>
                            <img src={svg.calendarBlack} className='icon' alt='' />
                            <label htmlFor className='mt--0'>
                                Ngày tạo
                            </label>
                            <span htmlFor className='value'>
                                {tourData.dateCreate}
                            </span>
                        </div>
                        <div className='row-wrapper'>
                            <img src={svg.userBlack} className='icon' alt='' />
                            <label htmlFor className='mt--0'>
                                Người tạo
                            </label>
                            <span htmlFor className='value'>
                                {tourData.idStaffCreate}
                            </span>
                        </div>
                        <div className='row-wrapper'>
                            <img src={svg.userBlack} className='icon' alt='' />
                            <label htmlFor className='mt--0'>
                                Người hủy
                            </label>
                            <span htmlFor className='value'>
                                {tourData.idStaffCanel || 'Tour chưa hủy'}
                            </span>
                        </div>
                        <div className='row-wrapper'>
                            <img src={svg.tourGuideBlack} className='icon' alt='' />
                            <label htmlFor='tour-guide' className='mt--0'>
                                Hướng dẫn viên
                            </label>
                            <span htmlFor className='value'>
                                {tourData.tourGuide ? 'Có' : 'Không'}
                            </span>
                        </div>
                    </div>
                    <div className='col-wrapper pad-0-12 w--30 col-flex-align-l'>
                        <div className='row-wrapper'>
                            <img src={svg.groupPersonBlack} className='icon' alt='' />
                            <label htmlFor className='mt--0'>
                                Số người tối thiểu
                            </label>
                            <span htmlFor className='value'>
                                {tourData.minQuantity || 'Không có'}
                            </span>
                        </div>
                        <div className='row-wrapper'>
                            <img src={svg.groupPersonBlack} className='icon' alt='' />
                            <label htmlFor className='mt--0'>
                                Số người tối đa
                            </label>
                            <span htmlFor className='value'>
                                {tourData.maxQuantity || 'Không có'}
                            </span>
                        </div>
                        <div className='row-wrapper'>
                            <label htmlFor>Phí hủy mức 1(%)</label>
                            <span htmlFor className='value'>
                                {tourData.normalPenaltyFee}
                            </span>
                        </div>
                        <div className='row-wrapper'>
                            <label htmlFor>Phí hủy mức 2(%)</label>
                            <span htmlFor className='value'>
                                {tourData.strictPenaltyFee}
                            </span>
                        </div>
                        <label htmlFor>Thời điểm áp dụng phí hủy mức 2</label>
                        <div className='row-wrapper flex-align-l'>
                            <span htmlFor className='value border'>
                                {tourData.minDate}
                            </span>
                            <label htmlFor className='mt--0 ml--12'>
                                {' '}
                                ngày trước ngày khởi hành
                            </label>
                        </div>
                    </div>
                </div>
                <div className='row-wrapper flex-align-l mt--12'>
                    <div className='col-wrapper w--30'>
                        <label htmlFor className='text-left tour-details-intro-heading'>
                            Giới thiệu
                        </label>
                        <textarea cols={30} rows={10} className='intro' disabled value={tourData.tourIntro} />
                    </div>
                    <div className='col-wrapper ml--12 w--100'>
                        <label htmlFor className='text-left tour-details-detail-heading'>
                            Chi tiết
                        </label>
                        <textarea className='detail' disabled value={tourData.tourDetail} />
                    </div>
                </div>
            </td>
        </>
    );
}

export default TourDetail;
