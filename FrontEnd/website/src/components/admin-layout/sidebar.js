import css from './style.module.css';
import svg from './../../assets/svg/index';
function SideBar() {
    let manageStaff = window.location.pathname == '/manage-staff';
    let manageTour = window.location.pathname == '/manage-tour';
    console.log(manageTour);
    return (
        <div className={css['side-bar']}>
            {localStorage.role == 'admin' && (
                <a href='manage-staff' style={manageStaff ? {backgroundColor: 'var(--purple)'} : {}}>
                    <img src={svg.groupPersonBlack} alt='' /> Quản lý nhân viên
                </a>
            )}
            <a href='manage-tour' style={manageTour ? {backgroundColor: 'var(--purple)'} : {}}>
                <img src={svg.tour} alt='' />
                Quản lý tour
            </a>
            <a href='/sign-in' className={css['sign-out']}>
                <img src={svg.logOut} alt='' />
                Đăng xuất
            </a>
        </div>
    );
}

export default SideBar;
