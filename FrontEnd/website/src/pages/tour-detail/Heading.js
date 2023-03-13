import destinationSvg from '../../assets/svg/destination.svg';
import css from './style.module.css';

function Heading() {
    return (
        <div className={css['tour-heading']}>
            <h1 className={css['tour-name']}>Tour đà lạt 3 ngày 3 đêm</h1>
            <p className={css['tour-destination']}>
                <img src={destinationSvg} alt='' />
                Tour Destination
            </p>
        </div>
    );
}

export default Heading;
