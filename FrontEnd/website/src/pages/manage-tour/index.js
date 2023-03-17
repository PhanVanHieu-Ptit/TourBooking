import AdminLayout from '../../components/admin-layout';
import checkRole from './../../utils/checkRole';
import css from './style.module.css';
import svg from './../../assets/svg/index';
import Functions from './../components/Functions';
import TourDetail from './TourDetail';
import {useState, useRef, useEffect} from 'react';
import {getListTour} from '../../utils/services';
import {setDisplayLoading} from '../../utils/axiosConfig';
import TourRowData from './TourRowData';
function ManageTour() {
    checkRole();
    let paging = 1;
    const [listTour, setListTour] = useState([]);
    const [showAddNewPopup, setShowAddNewPopup] = useState(false);
    const containerRef = useRef();
    useEffect(() => {
        getListTour().then((rs) => {
            setListTour(listTour.concat(rs.data));
        });
    }, []);

    const handleSubmitSearch = (e, searchValue) => {
        e.preventDefault();
        listTour = [];
        paging = 1;
        getListTour(searchValue, paging).then((rs) => {
            setListTour(listTour.concat(rs.data));
        });
    };

    const handleScroll = () => {
        const container = containerRef.current;
        const {scrollTop, offsetHeight, scrollHeight} = container;
        if (Math.round(scrollTop) + offsetHeight >= scrollHeight - 2) {
            getListTour('', paging).then((rs) => {
                setListTour(listTour.concat(rs.data));
            });
        }
    };
    return (
        <AdminLayout>
            <main className={css.main}>
                <Functions
                    handleSubmitSearch={handleSubmitSearch}
                    setShowAddNewPopup={setShowAddNewPopup}
                    title='Danh sách tour'></Functions>
                <div className='col-wrapper'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{width: '40px'}} />
                                <th>MÃ TOUR</th>
                                <th>TÊN TOUR</th>
                                <th>NGÀY KHỞI HÀNH</th>
                                <th>ĐIỂM ĐẾN</th>
                                <th>TRẠNG THÁI</th>
                                <th>ĐƠN GIÁ</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody ref={containerRef} onScroll={handleScroll}>
                            {listTour.map((e, i) => {
                                if (i <= 1) return <TourRowData tourData={e} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </AdminLayout>
    );
}

export default ManageTour;
