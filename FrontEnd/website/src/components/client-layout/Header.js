import userSvg from '../../assets/svg/user.svg';
import Popup from '../Popup';
import {useState} from 'react';
import BookedToursClient from '../../pages/components/BookedToursClient';
import Hero from '../Hero';
import ChangeUserInfo from './../../pages/components/ChangeUserInfor';

function Header() {
    const [showOrderedTourPopup, setShowOrderedTourPopup] = useState(false);
    const [showChangeUserInforPopup, setShowChangeUserInforPopup] = useState(false);

    return (
        <>
            <header>
                <Hero />
                <nav>
                    {localStorage.token ? (
                        <div className='signed-in-container'>
                            <a
                                href='#'
                                className='user'
                                onClick={() => setShowChangeUserInforPopup(!showChangeUserInforPopup)}>
                                <img src={localStorage.imageUrl == 'null' ? userSvg : localStorage.imageUrl} alt='' />
                                <span className='user-name'>{localStorage.name}</span>
                            </a>
                            <a href='#' onClick={() => setShowOrderedTourPopup(!showOrderedTourPopup)}>
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
            {showOrderedTourPopup && (
                <Popup
                    name='Lịch Sử Đặt Tour'
                    content={<BookedToursClient />}
                    onClose={() => setShowOrderedTourPopup(!showOrderedTourPopup)}></Popup>
            )}
            {showChangeUserInforPopup && (
                <Popup
                    name='Đổi thông tin cá nhân'
                    content={<ChangeUserInfo />}
                    onClose={() => setShowChangeUserInforPopup(!showChangeUserInforPopup)}></Popup>
            )}
        </>
    );
}

export default Header;
