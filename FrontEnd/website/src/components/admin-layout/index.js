import Header from './Header';
import SideBar from './SideBar';
import css from './style.module.css';
function AdminLayout({children}) {
    return (
        <>
            <Header></Header>
            <div className={css.body}>
                <SideBar></SideBar>
                {children}
            </div>
        </>
    );
}

export default AdminLayout;
