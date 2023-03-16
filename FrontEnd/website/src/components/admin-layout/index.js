import Header from './Header';
import SideBar from './SideBar';
import css from './style.module.css';
import svg from './../../assets/svg/index';
function AdminLayout({children}) {
    return (
        <>
            <Header></Header>
            <div className={css.body}>
                <SideBar></SideBar>
                <main>
                    <h3 className={css.title}>Danh sách nhân viên</h3>
                    <div className='row-wrapper'>
                        <div className={css['search-container']}>
                            <input type='text' placeholder='Nhập từ khóa' className={css['search-input']} />
                            <img src={svg.search} alt='image' />
                        </div>
                        <button className='btn-purple'>
                            <img src={svg.add} alt='image' />
                            Thêm mới
                        </button>
                    </div>
                    {children}
                </main>
            </div>
        </>
    );
}

export default AdminLayout;
