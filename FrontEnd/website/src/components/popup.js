function Popup({content, onClose}) {
    return (
        <div className='popup' onClick={onClose}>
            <div className='popup-content' onClick={(e) => e.stopPropagation()}>
                <div className='popup-heading'>Lịch sử đặt tour</div>
                <button className='popup-btn-close' onClick={onClose}>
                    &times;
                </button>
                {content}
            </div>
        </div>
    );
}

export default Popup;
