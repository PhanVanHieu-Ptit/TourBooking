function AddTour() {
    return (
        <div className='popup tour-popup'>
            <div className='popup-content'>
                <div className='popup-heading'>Cập nhật tour</div>
                <img className='popup-btn-close' src='../shared/close.svg' />
                <form action className='col-wrapper'>
                    <div className='row-wrapper'>
                        <div className='col-wrapper pad-0-12 flex-1 images'>
                            <img src='../shared/img/main-bg.png' alt='' className='big-display' />
                            <input type='file' defaultValue='../shared/default-avt.svg' className='avt' />
                            <div className='row-wrapper'>
                                <img src='../shared/img/tour2.jpg' alt='' className='small-display' />
                            </div>
                        </div>
                        <div className='col-wrapper pad-0-12 w--30 flex-align-l'>
                            <label htmlFor className='mt--0'>
                                Tên tour
                            </label>
                            <input type='text' />
                            <label htmlFor>Ngày bắt đầu</label>
                            <input type='date' name id />
                            <label htmlFor>Độ dài(ngày)</label>
                            <input type='number' name id className='w--30' />
                            <label htmlFor>Điểm đón</label>
                            <input type='text' />
                            <label htmlFor>Điểm đến</label>
                            <input type='text' name id />
                        </div>
                        <div className='col-wrapper pad-0-12 w--30'>
                            <div className='row-wrapper'>
                                <div className='col-wrapper flex-align-l'>
                                    <label htmlFor className='mt--0'>
                                        Số người tối thiểu
                                    </label>
                                    <input type='number' className='w--50' />
                                </div>
                                <div className='col-wrapper flex-align-l'>
                                    <label htmlFor className='mt--0'>
                                        Số người tối đa
                                    </label>
                                    <input type='number' name id className='w--50' />
                                </div>
                            </div>
                            <div className='row-wrapper'>
                                <div className='col-wrapper flex-align-l'>
                                    <label htmlFor>Phí hủy mức 1(%)</label>
                                    <input type='number' name id className='w--50' />
                                </div>
                                <div className='col-wrapper flex-align-l'>
                                    <label htmlFor>Phí hủy mức 2</label>
                                    <input type='number' name id className='w--50' />
                                </div>
                            </div>
                            <div className='col-wrapper w--100'>
                                <label htmlFor>Thời điểm áp dụng phí hủy mức 2</label>
                                <div className='row-wrapper'>
                                    <input type='number' name id className='w--30' />
                                    <label htmlFor className='mt--0 ml--12'>
                                        {' '}
                                        ngày trước ngày khởi hành
                                    </label>
                                </div>
                            </div>
                            <label htmlFor>Đơn giá</label>
                            <input type='number' name id />
                            <div className='row-wrapper mt--24 flex-align-c flex-align-l'>
                                <input type='checkbox' name='tour-guide' id defaultValue className='w--10' />
                                <label htmlFor='tour-guide' className='flex-1 mt--0'>
                                    Hướng dẫn viên
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='row-wrapper flex-align-l'>
                        <div className='col-wrapper w--30'>
                            <label htmlFor>Giới thiệu</label>
                            <textarea name id cols={30} rows={10} className='intro' defaultValue={''} />
                        </div>
                        <div className='col-wrapper ml--12 w--100'>
                            <label htmlFor>Chi tiết</label>
                            <textarea name id className='detail' defaultValue={''} />
                        </div>
                    </div>
                    <button type='submit' className='btn--gold '>
                        Lưu
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddTour;
