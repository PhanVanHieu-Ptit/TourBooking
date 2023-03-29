import css from './style.module.css';
import {useEffect, useState} from 'react';
import {getListTour} from '../../utils/services';

function FeaturedTour() {
    const [listTour, setListTour] = useState([]);
    useEffect(() => {
        getListTour('featured').then((rs) => setListTour(rs.data));
    }, []);
    var count = 0;
    return (
        <div className={css['featured-tours']}>
            <div className={css['featured-tours-content']}>
                <h1 className={css['featured-tours-heading']}>Tour nổi bật</h1>
                <div className={css['tours']}>
                    {listTour.map((e, i) => {
                        if (e.featured && count < 5) {
                            ++count;
                            return (
                                <a key={i} className={css['tour']} href={'/tour-detail/' + e.idTour}>
                                    <img
                                        src={e.imageUrl[0] || 'https://i.ibb.co/PQvBX4C/sun222-410.jpg'}
                                        alt='tour2'
                                        border={0}
                                    />
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
