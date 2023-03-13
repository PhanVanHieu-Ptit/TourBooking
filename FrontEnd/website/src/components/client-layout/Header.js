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
                    <div className='signed-in-container'>
                        <a href='#' className='user'>
                            <img src={userSvg} alt='' />
                            <span className='user-name'>User name</span>
                        </a>
                        <a href='/#tourhistory' onClick={togglePopup}>
                            Lịch sử đặt tour
                        </a>
                        <a href='/sign-in' onClick={() => localStorage.removeItem('token')}>
                            Đăng xuất
                        </a>
                    </div>
                    <div className='non-signed-in-container'>
                        <a href='/sign-in'>Đăng nhập</a>
                        <a href='/sign-up' className='btn--gold'>
                            Đăng ký
                        </a>
                    </div>
                </nav>
            </header>
            {showPopup && <Popup content={<BookedToursClient />} onClose={togglePopup}></Popup>}
        </>
    );
}

export default Header;
