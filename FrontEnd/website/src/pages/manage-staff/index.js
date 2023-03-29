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
import {toast} from 'react-toastify';
function ManageStaff() {
    checkRole();
    const [listStaff, setListStaff] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showAddNewPopup, setShowAddNewPopup] = useState(false);
    let [paging, setPaging] = useState(1);

    useEffect(() => {
        getListStaff(searchValue).then((rs) => {
            setListStaff(rs.data);
        });
    }, []);
    const handleSubmitSearch = (e, searchValue) => {
        e.preventDefault();
        setPaging(1);
        setSearchValue(searchValue);
        getListStaff(searchValue).then((rs) => {
            setListStaff(rs.data);
        });
    };

    const handleLoadData = () => {
        setPaging(++paging);
        getListStaff(searchValue, paging).then((rs) => {
            if (!rs.data.length) return toast.warning('Không còn dữ liệu!');
            setListStaff(listStaff.concat(rs.data));
        });
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
                        <tbody>
                            {listStaff.map((e) => (
                                <StaffRowData staffData={e} key={e.idStaff} />
                            ))}
                            <tr>
                                <p
                                    onClick={handleLoadData}
                                    className='mt--12'
                                    style={{textAlign: 'center', cursor: 'pointer'}}>
                                    Xem thêm
                                </p>
                            </tr>
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
