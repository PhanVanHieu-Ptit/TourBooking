import css from './style.module.css';
import svg from './../../assets/svg/index';
function SideBar() {
    return (
        <div className={css['side-bar']}>
            <a href='manage-staff'>
                <img src={svg.groupPersonBlack} alt='' /> Quản lý nhân viên
            </a>
            <a href='manage-tour'>
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
