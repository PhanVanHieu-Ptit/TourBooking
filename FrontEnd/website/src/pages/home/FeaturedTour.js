import css from './style.module.css';

function FeaturedTour({memoizedOptions}) {
    var count = 0;
    return (
        <div className={css['featured-tours']}>
            <div className={css['featured-tours-content']}>
                <h1 className={css['featured-tours-heading']}>Tour nổi bật</h1>
                <div className={css['tours']}>
                    {memoizedOptions.map((e, i) => {
                        if (e.featured && count < 5) {
                            ++count;
                            return (
                                <a key={i} className={css['tour']} href={'/tour-detail/' + e.idTour}>
                                    <img src={e.tourpictures[0].imageUrl} alt='tour2' border={0} />
                                    <div className={css['tour-name']}>{e.name}</div>
                                </a>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default FeaturedTour;
