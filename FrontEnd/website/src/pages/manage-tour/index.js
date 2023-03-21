import AdminLayout from '../../components/admin-layout';
import checkRole from './../../utils/checkRole';
import css from './style.module.css';
import svg from './../../assets/svg/index';
import Functions from './../components/Functions';
import TourDetail from './TourDetail';
import {useState, useRef, useEffect} from 'react';
import {getListTour} from '../../utils/services';
import TourRowData from './TourRowData';
import Popup from './../../components/Popup';
import TourForm from './TourForm';
function ManageTour() {
    checkRole();
    console.log('manageTour');
    const [listTour, setListTour] = useState([]);
    const [showAddNewPopup, setShowAddNewPopup] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    let [paging, setPaging] = useState(1);
    console.log(listTour);
    useEffect(() => {
        getListTour().then((rs) => {
            setListTour(rs.data);
        });
    }, []);
    const handleSubmitSearch = (e, searchValue) => {
        e.preventDefault();
        setPaging(1);
        setSearchValue(searchValue);
        getListTour(searchValue).then((rs) => {
            setListTour(rs.data);
        });
    };

    const handleSeeMore = () => {
        setPaging(++paging);
        getListTour(searchValue, paging).then((rs) => {
            setListTour(listTour.concat(rs.data));
        });
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
                                <th>NGÀY TẠO</th>
                                <th>ĐIỂM ĐẾN</th>
                                <th>TRẠNG THÁI</th>
                                <th>ĐƠN GIÁ</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {listTour.map((e, i) => {
                                return <TourRowData tour={e} />;
                            })}
                            <tr>
                                <p
                                    onClick={handleSeeMore}
                                    className='mt--12'
                                    style={{textAlign: 'center', cursor: 'pointer'}}>
                                    Xem thêm
                                </p>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            {showAddNewPopup && (
                <Popup
                    name='Thêm mới tour'
                    content={<TourForm listTour={listTour} update={false} setListTour={setListTour} />}
                    onClose={() => setShowAddNewPopup(false)}
                />
            )}
        </AdminLayout>
    );
}

export default ManageTour;
