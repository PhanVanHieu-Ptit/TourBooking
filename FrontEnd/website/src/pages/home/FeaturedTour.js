function FeaturedTour() {
    return (
        <div className='featured-tours'>
            <div className='featured-tours-content'>
                <h1 className='featured-tours-heading'>Tour nổi bật</h1>
                <div className='tours'>
                    <div className='tour'>
                        <img src='https://i.ibb.co/p1hDgsD/tour2.jpg' alt='tour2' border={0} />
                        <div className='tour-name'>Tour 1</div>
                        <a href='#' />
                    </div>
                    <div className='tour'>
                        <img src='https://i.ibb.co/v1tjn0n/tour1.jpg' alt='tour1' border={0} />
                        <div className='tour-name'>Tour 2</div>
                        <a href='#' />
                    </div>
                    <div className='tour'>
                        <img src='https://i.ibb.co/WFKrxDP/tour5.jpg' alt='tour5' border={0} />
                        <div className='tour-name'>Tour 3</div>
                        <a href='#' />
                    </div>
                    <div className='tour'>
                        <img src='https://i.ibb.co/PY4KVHX/tour3.jpg' alt='tour3' border={0} />
                        <div className='tour-name'>Tour 4</div>
                        <a href='#' />
                    </div>
                    <div className='tour'>
                        <img src='https://i.ibb.co/vzfKgFL/tour4.jpg' alt='tour4' border={0} />
                        <div className='tour-name'>Tour 5</div>
                        <a href='#' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedTour;
