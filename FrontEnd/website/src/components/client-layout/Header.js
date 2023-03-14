import userSvg from '../../assets/svg/user.svg';
import Popup from '../Popup';
import {useState} from 'react';
import BookedToursClient from '../../pages/components/BookedToursClient';
import Hero from '../Hero';

function Header() {
    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    return (
        <>
            <header>
                <Hero />
                <nav>
                    {localStorage.token ? (
                        <div className='signed-in-container'>
                            <a href='#' className='user'>
                                <img src={localStorage.imageUrl == 'null' ? userSvg : localStorage.imageUrl} alt='' />
                                <span className='user-name'>{localStorage.name}</span>
                            </a>
                            <a href='#' onClick={togglePopup}>
                                Lịch sử đặt tour
                            </a>
                            <a href='/sign-in' onClick={() => localStorage.removeItem('token')} className='btn--gold'>
                                Đăng xuất
                            </a>
                        </div>
                    ) : (
                        <div className='non-signed-in-container'>
                            <a href='/sign-in'>Đăng nhập</a>
                            <a href='/sign-up' className='btn--gold'>
                                Đăng ký
                            </a>
                        </div>
                    )}
                </nav>
            </header>
            {showPopup && <Popup content={<BookedToursClient />} onClose={togglePopup}></Popup>}
        </>
    );
}

export default Header;
