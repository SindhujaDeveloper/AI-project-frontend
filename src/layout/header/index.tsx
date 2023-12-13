import React from "react";
import { Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "src/redux/reducers";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <header className="d-flex justify-content-between align-items-center cursor-pointer">
      <h3>Header</h3>
      <Image src={"logoutIcon"} alt="logout" onClick={() => dispatch(logout())} />
    </header>
  );
};

export default Header;