import hero from '../assets/svg/hero.svg';
import heroBlack from '../assets/svg/hero-black.svg';
function Hero({black, className = ''}) {
    return (
        <a href='/' className={className} style={{display: 'block'}}>
            <img src={black ? heroBlack : hero} alt='' />
        </a>
    );
}

export default Hero;
