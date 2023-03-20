import svg from '../../assets/svg';
import css from './style.module.css';
function TourDetail({tourData}) {
    return (
        <>
            <td className={css['tour-details']}>
                <img src={tourData.imageUrl[0]} alt='icon' className={css.bg} />
                <div className={css.content}>
                    <div className='row-wrapper flex-align-c'>
                        <div className={css.images + ' row-wrapper flex-align-l pad-0-12'}>
                            {tourData.imageUrl.map((e) => (
                                <img src={e} alt='icon' className='small-display' />
                            ))}
                        </div>
                        <div className='col-wrapper pad-0-12 w--50'>
                            <div className='row-wrapper flex-align-c'>
                                <img src={svg.hourglassBlack} className={css.icon} alt='icon' />
                                <label htmlFor>Độ dài(ngày)</label>
                                <span htmlFor className='value'>
                                    {tourData.totalDay} ngày
                                </span>
                            </div>
                            <div className='row-wrapper flex-align-c'>
                                <img src={svg.destinationBlack} className={css.icon} alt='icon' />
                                <label htmlFor>Điểm đón</label>
                                <span htmlFor className='value'>
                                    {tourData.pickUpPoint}
                                </span>
                            </div>
                            <div className='row-wrapper flex-align-c'>
                                <img src={svg.calendarBlack} className={css.icon} alt='icon' />
                                <label htmlFor className='mt--0'>
                                    Ngày khởi hành
                                </label>
                                <span htmlFor className='value'>
                                    {tourData.startDate}
                                </span>
                            </div>
                            <div className='row-wrapper flex-align-c'>
                                <img src={svg.userBlack} className={css.icon} alt='icon' />
                                <label htmlFor className='mt--0'>
                                    Người tạo
                                </label>
                                <span htmlFor className='value'>
                                    {tourData.idStaffCreate}
                                </span>
                            </div>
                            <div className='row-wrapper flex-align-c'>
                                <img src={svg.userBlack} className={css.icon} alt='icon' />
                                <label htmlFor className='mt--0'>
                                    Người hủy
                                </label>
                                <span htmlFor className='value'>
                                    {tourData.idStaffCanel || 'Tour chưa hủy'}
                                </span>
                            </div>
                            <div className='row-wrapper flex-align-c'>
                                <img src={svg.tourGuideBlack} className={css.icon} alt='icon' />
                                <label htmlFor='tour-guide' className='mt--0'>
                                    Hướng dẫn viên
                                </label>
                                <span htmlFor className='value'>
                                    {tourData.tourGuide ? 'Có' : 'Không'}
                                </span>
                            </div>
                        </div>
                        <div className='col-wrapper pad-0-12 w--50 col-flex-align-l'>
                            <div className='row-wrapper flex-align-c'>
                                <img src={svg.groupPersonBlack} className={css.icon} alt='icon' />
                                <label htmlFor className='mt--0'>
                                    Số người tối thiểu
                                </label>
                                <span htmlFor className='value'>
                                    {tourData.minQuantity || 'Không có'}
                                </span>
                            </div>
                            <div className='row-wrapper flex-align-c'>
                                <img src={svg.groupPersonBlack} className={css.icon} alt='icon' />
                                <label htmlFor className='mt--0'>
                                    Số người tối đa
                                </label>
                                <span htmlFor className='value'>
                                    {tourData.maxQuantity || 'Không có'}
                                </span>
                            </div>
                            <div className='row-wrapper flex-align-c'>
                                <img src={svg.moneyBlack} className={css.icon} alt='icon' />

                                <label htmlFor>Phí hủy mức 1(%)</label>
                                <span htmlFor className='value'>
                                    {tourData.normalPenaltyFee}
                                </span>
                            </div>
                            <div className='row-wrapper flex-align-c'>
                                <img src={svg.moneyBlack} className={css.icon} alt='icon' />
                                <label htmlFor>Phí hủy mức 2(%)</label>
                                <span htmlFor className='value'>
                                    {tourData.strictPenaltyFee}
                                </span>
                            </div>
                            <label htmlFor>Thời điểm áp dụng phí hủy mức 2</label>
                            <div className='row-wrapper flex-align-c flex-align-l'>
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
                </div>
            </td>
        </>
    );
}

export default TourDetail;
