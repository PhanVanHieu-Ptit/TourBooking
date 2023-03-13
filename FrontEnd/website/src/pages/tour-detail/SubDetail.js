import css from './style.module.css';
function SubDetail({memoizedOptions}) {
    const data = memoizedOptions;
    return (
        <div className={css['sub-details']}>
            <div className={css['left-area']}>
                <div className={css['image-area']}>
                    <img src={data.tourpictures[0].imageUrl} alt='' className={css['big-display']} />
                    <div className={css['images']}>
                        {data.tourpictures.map((e) => (
                            <img src={e.imageUrl} alt='Hình Ảnh Tour' />
                        ))}
                    </div>
                </div>
                <h1>Chi tiết</h1>
                <div className={css['description']}>{data.tourDetail}</div>
            </div>
            <div className={css['right-area']}>
                <h1>Giới thiệu</h1>
                <p className={css['intro']}>{data.tourIntro}</p>
                <form className={css['booking-frm']}>
                    <label htmlFor='quantity'>Số người</label>
                    <input type='number' name='quantity' />
                    <label htmlFor='note'>Ghi chú</label>
                    <textarea cols={30} rows={10} defaultValue={''} />
                    <button className='btn--gold' type='submit'>
                        Đặt ngay
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SubDetail;
