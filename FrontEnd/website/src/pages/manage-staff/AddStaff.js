function AddStaff() {
    return (
        <div className='popup' style={{display: 'none'}}>
            <div className='popup-content'>
                <div className='popup-heading'>Thêm nhân viên</div>
                <button className='popup-btn-close'>&times;</button>
                <form action>
                    <label>Họ tên</label>
                    <input type='text' />
                    <label>Email</label>
                    <input type='email' />
                    <button type='submit' className='btn--gold'>
                        Lưu
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddStaff;
