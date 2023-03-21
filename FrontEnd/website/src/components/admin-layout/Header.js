import Hero from "./../Hero";
import css from "./style.module.css";
import svg from "./../../assets/svg/index";
import { useState, useEffect } from "react";
import { getOwnInfor } from "../../utils/services";
import ChangeUserInfo from "../../pages/components/ChangeUserInfor";
import Popup from "../Popup";

function Header() {
  const [showChangeUserInforPopup, setShowChangeUserInforPopup] =
    useState(false);

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getOwnInfor().then((rs) => setUserData(rs.data[0]));
  }, []);
  return (
    <header className={css.header}>
      <Hero black={true} />
      {userData && (
        <a href="#" onClick={() => setShowChangeUserInforPopup(true)}>
          <img
            src={userData.imageUrl || svg.userBlack}
            alt="image"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "1px solid var(--purple-dark)",
            }}
          />
          <span className="value">
            Xin chào! <br /> {userData.name}
          </span>
        </a>
      )}
      {showChangeUserInforPopup && (
        <Popup
          name="Đổi thông tin cá nhân"
          content={<ChangeUserInfo />}
          onClose={() => setShowChangeUserInforPopup(false)}
          style={{ width: "400px" }}
        />
      )}
    </header>
  );
}

export default Header;
