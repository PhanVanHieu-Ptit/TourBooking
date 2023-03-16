import css from './style.module.css';
import svg from './../../assets/svg/index';
function SideBar() {
    return (
        <div className={css['side-bar']}>
            <a href=''>
                <img src={svg.groupPersonBlack} alt='' /> Quản lý nhân viên
            </a>
            <a href=''>
                <img src={svg.tour} alt='' />
                Quản lý tour
            </a>
            <a href='' className={css['sign-out']}>
                <img src={svg.logOut} alt='' />
                Đăng xuất
            </a>
        </div>
    );
}

export default SideBar;
