import heroSvg from '../../assets/svg/hero.svg';
import facebookSvg from '../../assets/svg/facebook.svg';
import twitterSvg from '../../assets/svg/twitter.svg';
import instaSvg from '../../assets/svg/insta.svg';
import css from './style.module.css';

function Footer() {
    return (
        <footer className={css.footer}>
            <img src={heroSvg} alt='My Happy SVG' />
            <div className={css.socials}>
                <a className={css.facebook} href='#'>
                    <img src={facebookSvg} alt='' />
                </a>
                <a className={css.twitter} href='#'>
                    <img src={twitterSvg} alt='' />
                </a>
                <a className={css.insta} href='#'>
                    <img src={instaSvg} alt='' />
                </a>
            </div>
            <div className={css.infor}>
                <div className={css.policies}>
                    <a href='#'> Chính sách bảo mật </a>
                    <a href='#'>Chính sách cookie</a>
                    <a href='#'>Điều khoản sử dụng</a>
                </div>
                <div className={css['more-infor']}>
                    <a href='#'>Mon - Fri from 9:00 - 18:00</a>
                    <a href='#' className={css.gold}>
                        +8404429924
                    </a>
                    <a href='#' className={css.gold}>
                        +8473343541
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
