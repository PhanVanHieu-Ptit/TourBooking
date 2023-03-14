import css from './style.module.css';
import FeaturedTour from './FeaturedTour';
import MainBackground from '../components/MainBackground';
import DefaultClientLayout from '../../components/client-layout';
import helloSvg from '../../assets/svg/hello.svg';
import React, {useState, useEffect, useMemo} from 'react';
import {getListTour} from '../../utils/services';
import SearchedTour from './SearchedTour';
function HomePage() {
    const [tours, setTours] = useState([]);
    useEffect(() => {
        getListTour().then((rs) => setTours(rs.data));
    }, []);
    const memoizedOptions = useMemo(() => tours, [tours]);

    const [searchKey, setSearchKey] = useState('');
    const [searchedTourComponent, setSearchedTourComponent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchedTourComponent(<SearchedTour searchKey={searchKey} tours={tours} />);
    };

    return (
        <DefaultClientLayout>
            <main>
                <MainBackground />
                <img src={helloSvg} className={css['main-heading']} />
                <form className={css['search-container']} onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Bạn muốn đi đâu?'
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <button className='btn--gold' type='submit'>
                        Tìm kiếm
                    </button>
                </form>
                {searchedTourComponent}
                {/* <SearchedTour searchKey={''} tours={tours} /> */}
                <FeaturedTour memoizedOptions={memoizedOptions}></FeaturedTour>
            </main>
        </DefaultClientLayout>
    );
}

export default HomePage;
