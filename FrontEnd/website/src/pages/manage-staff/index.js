import checkRole from './../../utils/checkRole';
import AdminLayout from './../../components/admin-layout/index';
import {getListStaff} from '../../utils/services';
import {useState, useEffect, useRef} from 'react';
import Functions from './../components/Functions';
import Popup from './../../components/Popup';
import AddStaff from './AddStaff';
import StaffRowData from './StaffRowData';
import css from './style.module.css';
import {setDisplayLoading} from '../../utils/axiosConfig';
function ManageStaff() {
    checkRole();
    const page = 10;

    const [listStaff, setListStaff] = useState([]);
    const [showAddNewPopup, setShowAddNewPopup] = useState(false);
    const [displayedData, setDisplayedData] = useState([]);
    let [displayedCount, setDisplayedCount] = useState(page);
    const containerRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = (searchValue) => {
        setDisplayedCount(page);
        getListStaff(searchValue).then((rs) => {
            setListStaff(rs.data);
            setDisplayedData(rs.data.slice(0, displayedCount));
        });
    };
    const handleSubmitSearch = (e, searchValue) => {
        e.preventDefault();
        fetchData(searchValue);
    };

    const handleScroll = () => {
        const container = containerRef.current;
        const {scrollTop, offsetHeight, scrollHeight} = container;
        if (Math.round(scrollTop) + offsetHeight >= scrollHeight - 2) {
            setDisplayLoading(true);
            setTimeout(() => {
                setDisplayedCount(displayedCount + page);
                setDisplayedData(listStaff.slice(0, displayedCount + page));
                setDisplayLoading(false);
            }, 500);
        }
    };
    return (
        <>
            <AdminLayout>
                <main className={css.main}>
                    <Functions
                        handleSubmitSearch={handleSubmitSearch}
                        setShowAddNewPopup={setShowAddNewPopup}
                        title='Quản lý nhân viên'></Functions>
                    <table>
                        <thead>
                            <tr>
                                <th>MÃ NV</th>
                                <th>HỌ TÊN</th>
                                <th>EMAIL</th>
                                <th>HÌNH ẢNH</th>
                                <th>TRẠNG THÁI TÀI KHOẢN</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody ref={containerRef} onScroll={handleScroll}>
                            {displayedData.map((e) => (
                                <StaffRowData staffData={e} key={e.idStaff} />
                            ))}
                        </tbody>
                    </table>
                </main>
            </AdminLayout>
            {showAddNewPopup && (
                <Popup
                    name='Thêm nhân viên'
                    content={<AddStaff />}
                    onClose={() => setShowAddNewPopup(false)}
                    style={{width: '400px'}}
                />
            )}
        </>
    );
}

export default ManageStaff;
