import checkRole from './../../utils/checkRole';
import AdminLayout from './../../components/admin-layout/index';
import svg from './../../assets/svg/index';

function ManageStaff() {
    checkRole();
    return (
        <AdminLayout>
            <table>
                <tbody>
                    <tr>
                        <th>MÃ NV</th>
                        <th>HỌ TÊN</th>
                        <th>EMAIL</th>
                        <th>HÌNH ẢNH</th>
                        <th>TRẠNG THÁI TÀI KHOẢN</th>
                        <th />
                    </tr>
                    <tr className='value'>
                        <td className='id-value'>#id</td>
                        <td>Bùi Tuấn Hùng</td>
                        <td>hunbuituan1@gmail.com</td>
                        <td>
                            <img src={svg.defaultAvt} alt='image' />
                        </td>
                        <td>
                            <p className='status-green'>Chưa cấp</p>
                        </td>
                        <td className='options options-container'>
                            <img src={svg.keyBlack} alt='image' className='option' />
                            <img src={svg.edit} alt='image' className='option' />
                            <img src={svg.lock} alt='image' className='option' />
                            <img src={svg.unlock} alt='image' className='option' />
                        </td>
                    </tr>
                </tbody>
            </table>
        </AdminLayout>
    );
}

export default ManageStaff;
