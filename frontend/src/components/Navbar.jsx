// import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { logoutUser } from "../features/authSlice";

import styled from "styled-components";
import "../fonts/AmerikaSignature.ttf";
import * as FaIcons from "react-icons/fa";

const Navbar = () => {
  const [isMobileSidebarToggled, setIsMobileSidebarToggled] = useState(false);
  // const dispatch = useDispatch();
  // const { cartTotalQty } = useSelector((state) => state.cart);
  // const auth = useSelector((state) => state.auth);

  const handleNavbarToggle = () => {
    setIsMobileSidebarToggled(!isMobileSidebarToggled);
  };

  console.log("toggled?", isMobileSidebarToggled);

  return (
    <nav style={{ backgroundColor: "pink" }}>
      {/* <Link to="/">Home</Link> */}
      {/* {auth._id ? (
        <>
          {auth.isAdmin ? (
            <div>
              <Link to="/admin/summary">Admin</Link>
            </div>
          ) : null}

          <div
            onClick={() => {
              dispatch(logoutUser(null));
            }}
          >
            <Link to="/">Log Out</Link>
          </div>
        </>
      ) : (
        <div>
          <Link to="/register">Register</Link>
          <Link to="/login">Log In</Link>
        </div>
      )} */}

      {/* <Link to="/products">Products</Link> */}
      <NavbarHamburgerIcon
        onClick={() => {
          handleNavbarToggle();
        }}
      >
        <FaIcons.FaBars />
      </NavbarHamburgerIcon>
      <TitleLink to="/">heartsinthebyline</TitleLink>
      {/* <Link to="/faq">FAQ</Link>
      <Link to="/cart">Cart({cartTotalQty})</Link> */}
    </nav>
  );
};

export default Navbar;

const TitleLink = styled(Link)`
  display: flex;

  // top: 0;
  // background-color: #fff5fa;
  display: inline-block;
  text-decoration: none;
  color: #f578a6;
  font-size: 100px;
  font-family: "AmerikaSignature";
  margin-top: -0.3em;
`;

const NavbarHamburgerIcon = styled.div`
  display: flex;
  justify-content: left;
  padding-top: 15px;
  padding-left: 15px;
  color: #fff5fa;
`;
