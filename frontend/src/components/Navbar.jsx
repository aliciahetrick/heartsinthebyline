import { useSelector } from "react-redux";
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
  const { cartTotalQty } = useSelector((state) => state.cart);
  // const auth = useSelector((state) => state.auth);

  const handleNavbarToggle = () => {
    setIsMobileSidebarToggled(!isMobileSidebarToggled);
  };

  console.log("toggled?", isMobileSidebarToggled);

  return (
    <nav style={{ backgroundColor: "#ffd4e9" }}>
      {isMobileSidebarToggled ? (
        <MobileNavToggled>
          <CloseNavButton
            onClick={() => {
              handleNavbarToggle();
            }}
          >
            <FaIcons.FaTimes />
          </CloseNavButton>
          <TitleLink to="/">heartsinthebyline</TitleLink>
          <MobileNavItems>
            <MobileNavItem
              to="/products"
              onClick={() => {
                handleNavbarToggle();
              }}
              style={{ textDecoration: "none", color: "#f578a6" }}
            >
              Products
            </MobileNavItem>
            <MobileNavItem
              to="/cart"
              onClick={() => {
                handleNavbarToggle();
              }}
              style={{ textDecoration: "none", color: "#f578a6" }}
            >
              Cart({cartTotalQty})
            </MobileNavItem>
          </MobileNavItems>
        </MobileNavToggled>
      ) : (
        <>
          <NavbarHamburgerIcon
            onClick={() => {
              handleNavbarToggle();
            }}
          >
            <FaIcons.FaBars />
          </NavbarHamburgerIcon>

          <TitleLink to="/">heartsinthebyline</TitleLink>
        </>
      )}
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

const MobileNavToggled = styled.div`
  background-color: #ffd4e9;
  height: 100vh;
`;

const CloseNavButton = styled.div`
  display: flex;
  justify-content: right;
  padding-top: 15px;
  padding-right: 15px;

  color: #f578a6;
`;

const MobileNavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  height: 80vh;

  // justify-content: space-around;

  text-decoration: none;
  // color: #fff5fa;
  color: white;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 15px;
  margin-top: 10px;

  text-transform: uppercase;
`;

const MobileNavItem = styled(Link)``;
