import css from './style.module.css';
import FeaturedTour from './FeaturedTour';
import MainBackground from '../components/MainBackground';
import DefaultClientLayout from '../../components/client-layout';
import helloSvg from '../../assets/svg/hello.svg';
import React, {useState, useEffect, useMemo} from 'react';
import {getListTour} from '../../utils/services';
function HomePage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getListTour().then((rs) => setData(rs.data));
    }, []);
    const memoizedOptions = useMemo(() => data, [data]);
    return (
        <DefaultClientLayout>
            <main>
                <MainBackground />
                <img src={helloSvg} className={css['main-heading']} />
                <div className={css['search-container']}>
                    <input type='text' name='' id='' placeholder='Bạn muốn đi đâu?' list='tours' />
                    <datalist id='tours'>
                        {memoizedOptions.map((e, i) => (
                            <option key={i} value={e.name}>
                                {e.name}
                            </option>
                        ))}
                    </datalist>
                    <div className='btn--gold'>Tìm kiếm</div>
                </div>
                <FeaturedTour memoizedOptions={memoizedOptions}></FeaturedTour>
            </main>
        </DefaultClientLayout>
    );
}

export default HomePage;
