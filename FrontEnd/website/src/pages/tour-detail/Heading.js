import destinationSvg from '../../assets/svg/destination.svg';
function Heading() {
    return (
        <div className='tour-heading'>
            <h1 className='tour-name'>Tour đà lạt 3 ngày 3 đêm</h1>
            <p className='tour-destination'>
                <img src={destinationSvg} alt='' />
                Tour Destination
            </p>
        </div>
    );
}

export default Heading;
