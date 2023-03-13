import destinationSvg from '../../assets/svg/destination.svg';
import css from './style.module.css';

function Heading({memoizedOptions}) {
    const data = memoizedOptions;

    return (
        <div className={css['tour-heading']}>
            <h1 className={css['tour-name']}>{data.name}</h1>
            <p className={css['tour-destination']}>
                <img src={destinationSvg} alt='' />
                {data.tourDestination}
            </p>
        </div>
    );
}

export default Heading;
