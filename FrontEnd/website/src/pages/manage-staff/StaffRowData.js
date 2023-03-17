import svg from './../../assets/svg/index';
import {useState} from 'react';
import UpdateStaff from './UpdateStaff';
import Popup from './../../components/Popup';

function StaffRowData({staffData}) {
    const [data, setData] = useState(staffData);
    const [showPopupUpdateStaff, setShowPopupUpdateStaff] = useState(false);

    return (
        <>
            <tr className='value'>
                <td className='id-value'>#{data.idStaff}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                    <img src={data.imageUrl || svg.defaultAvt} alt='image' />
                </td>
                <td>
                    <p className={data.idStatus == 5 ? 'status-green' : 'status-red'}>{data.status}</p>
                </td>
                <td className='options options-container'>
                    <img
                        src={svg.edit}
                        alt='image'
                        className='option'
                        title='Chỉnh sửa'
                        onClick={() => setShowPopupUpdateStaff(true)}
                    />
                </td>
            </tr>
            {showPopupUpdateStaff && (
                <Popup
                    name='Cập nhật nhân viên'
                    onClose={() => setShowPopupUpdateStaff(false)}
                    content={<UpdateStaff data={data} setData={setData} />}
                    style={{width: '400px'}}
                />
            )}
        </>
    );
}

export default StaffRowData;
