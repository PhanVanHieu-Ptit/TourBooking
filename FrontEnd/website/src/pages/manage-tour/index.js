import AdminLayout from '../../components/admin-layout';
import checkRole from './../../utils/checkRole';
function ManageTour() {
    checkRole();
    return <AdminLayout></AdminLayout>;
}

export default ManageTour;
