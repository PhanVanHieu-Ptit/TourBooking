import Header from "./Header";
import SideBar from "./sidebar";
import css from "./style.module.css";
function AdminLayout({ children }) {
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
