import userSvg from '../../assets/svg/user.svg';
import Popup from '../Popup';
import {useState, useEffect} from 'react';
import BookedToursClient from '../../pages/components/BookedToursClient';
import Hero from '../Hero';
import ChangeUserInfo from './../../pages/components/ChangeUserInfor';
import {getOwnInfor} from '../../utils/services';
import css from './style.module.css';
function Header() {
    const [showOrderedTourPopup, setShowOrderedTourPopup] = useState(false);
    const [showChangeUserInforPopup, setShowChangeUserInforPopup] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        getOwnInfor().then((rs) => setUserData(rs.data[0]));
    }, []);
    return (
        <>
            <header className={css.header}>
                <Hero />
                <nav>
                    {localStorage.token && userData ? (
                        <div>
                            <a
                                href='#'
                                className='user'
                                onClick={() => setShowChangeUserInforPopup(!showChangeUserInforPopup)}>
                                <img src={userData.imageUrl || userSvg} alt='' style={{width: '35px'}} />
                                <span className={css['user-name']}>{userData.name}</span>
                            </a>
                            <a href='#' onClick={() => setShowOrderedTourPopup(!showOrderedTourPopup)}>
                                Lịch sử đặt tour
                            </a>
                            <a href='/sign-in' onClick={() => localStorage.removeItem('token')} className='btn--gold'>
                                Đăng xuất
                            </a>
                        </div>
                    ) : (
                        <div>
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
                    onClose={() => setShowChangeUserInforPopup(!showChangeUserInforPopup)}
                    style={{width: 'fit-content'}}></Popup>
            )}
        </>
    );
}

export default Header;
