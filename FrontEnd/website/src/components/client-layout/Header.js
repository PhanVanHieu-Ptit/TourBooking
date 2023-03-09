import heroSvg from '../../assets/svg/hero.svg';
import userSvg from '../../assets/svg/user.svg';
function Header() {
    return (
        <header>
            <img src={heroSvg} alt='My Happy SVG' className='header-hero' />
            <nav>
                <div className='signed-in-container'>
                    <a href='#' className='user'>
                        <img src={userSvg} alt='' />
                        <span className='user-name'>User name</span>
                    </a>
                    <a href='#'> Lịch sử đặt tour </a>
                    <a href='#'> Đăng xuất </a>
                </div>
                <div className='non-signed-in-container'>
                    <a href='#'>Đăng nhập</a>
                    <a href='#' className='btn--gold'>
                        Đăng ký
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default Header;
