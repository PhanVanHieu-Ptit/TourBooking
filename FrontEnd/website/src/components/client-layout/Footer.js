import heroSvg from '../../assets/svg/hero.svg';
import facebookSvg from '../../assets/svg/facebook.svg';
import twitterSvg from '../../assets/svg/twitter.svg';
import instaSvg from '../../assets/svg/insta.svg';
function Footer() {
    return (
        <footer>
            <img src={heroSvg} alt='My Happy SVG' className='header-hero' />
            <div className='socials'>
                <a className='facebook' href='#'>
                    <img src={facebookSvg} alt='' />
                </a>
                <a className='twitter' href='#'>
                    <img src={twitterSvg} alt='' />
                </a>
                <a className='insta' href='#'>
                    <img src={instaSvg} alt='' />
                </a>
            </div>
            <div className='infor'>
                <div className='policies'>
                    <a href='#'> Chính sách bảo mật </a>
                    <a href='#'>Chính sách cookie</a>
                    <a href='#'>Điều khoản sử dụng</a>
                </div>
                <div className='more-infor'>
                    <a href='#'>Mon - Fri from 9:00 - 18:00</a>
                    <a href='#' className='infor--color-gold'>
                        +8404429924
                    </a>
                    <a href='#' className='infor--color-gold'>
                        +8473343541
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
