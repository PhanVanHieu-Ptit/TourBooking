function Popup({name, content, onClose, style = {}}) {
    return (
        <div className='popup'>
            <div className='popup-content' onClick={(e) => e.stopPropagation()} style={style}>
                <div className='popup-heading'>{name}</div>
                <button className='popup-btn-close' onClick={onClose}>
                    &times;
                </button>
                {content}
            </div>
        </div>
    );
}

export default Popup;
