import Hero from './../Hero';
import css from './style.module.css';
import svg from './../../assets/svg/index';

function Header() {
    return (
        <header className={css.header}>
            <Hero black={true} />
            <a href=''>
                <img src={svg.userBlack} alt='image' />
                <span class='value'>Bùi Tuấn Hùng</span>
            </a>
        </header>
    );
}

export default Header;
