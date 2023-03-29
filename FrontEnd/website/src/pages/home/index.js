import css from './style.module.css';
import FeaturedTour from './FeaturedTour';
import MainBackground from '../components/MainBackground';
import DefaultClientLayout from '../../components/client-layout';
import helloSvg from '../../assets/svg/hello.svg';
import React, {useState, useEffect, useMemo} from 'react';
import {getListOrderTour, getListTour} from '../../utils/services';
import SearchedTour from './SearchedTour';
import checkRole from './../../utils/checkRole';
import {toast} from 'react-toastify';
function HomePage() {
    checkRole();
    const [listTour, setListTour] = useState([]);
    const [paging, setPaging] = useState(1);

    const [searchKey, setSearchKey] = useState('');
    const [searchedTourComponent, setSearchedTourComponent] = useState(false);
    const handleLoadData = () => {
        setPaging(paging + 1);
        getListTour(searchKey, paging + 1).then((rs) => {
            if (!rs.data.length) return toast.warning('Không còn dữ liệu!');
            setListTour(listTour.concat(rs.data));
        });
    };
    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        setPaging(1);
        getListTour(searchKey, paging).then((rs) => {
            setListTour(rs.data);
        });
        setSearchedTourComponent(true);
    };

    return (
        <DefaultClientLayout>
            <main>
                <MainBackground />
                <img src={helloSvg} className={css['main-heading']} />
                <form className={css['search-container']} onSubmit={handleSubmitSearch}>
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
                {searchedTourComponent && (
                    <SearchedTour searchKey={searchKey} tours={listTour} handleLoadData={handleLoadData} />
                )}
                <FeaturedTour></FeaturedTour>
            </main>
        </DefaultClientLayout>
    );
}

export default HomePage;
