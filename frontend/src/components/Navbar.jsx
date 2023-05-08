// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/authSlice";

import styled from "styled-components";
import "../fonts/AmerikaSignature.ttf";
import * as FaIcons from "react-icons/fa";

const Navbar = () => {
  const [isMobileSidebarToggled, setIsMobileSidebarToggled] = useState(false);
  const dispatch = useDispatch();
  const { cartTotalQty } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

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
              to="/"
              onClick={() => {
                handleNavbarToggle();
              }}
              style={{ textDecoration: "none", color: "#f578a6" }}
            >
              <FaIcons.FaHome /> Home
            </MobileNavItem>
            <MobileNavItem
              to="/products"
              onClick={() => {
                handleNavbarToggle();
              }}
              style={{ textDecoration: "none", color: "#f578a6" }}
            >
              <FaIcons.FaHeart /> Products
            </MobileNavItem>
            <MobileNavItem
              to="/cart"
              onClick={() => {
                handleNavbarToggle();
              }}
              style={{ textDecoration: "none", color: "#f578a6" }}
            >
              <FaIcons.FaShoppingCart /> Cart({cartTotalQty})
            </MobileNavItem>
            {auth._id ? (
              <>
                {auth.isAdmin ? (
                  <div>
                    <MobileNavItem
                      to="/admin/summary"
                      onClick={() => {
                        handleNavbarToggle();
                      }}
                      style={{ textDecoration: "none", color: "#f578a6" }}
                    >
                      <FaIcons.FaKey /> Admin
                    </MobileNavItem>
                  </div>
                ) : null}

                <div
                  onClick={() => {
                    dispatch(logoutUser(null));
                  }}
                >
                  <MobileNavItem
                    to="/"
                    onClick={() => {
                      handleNavbarToggle();
                    }}
                    style={{ textDecoration: "none", color: "#f578a6" }}
                  >
                    <FaIcons.FaSignOutAlt />
                    Log Out
                  </MobileNavItem>
                </div>
              </>
            ) : (
              <>
                <MobileNavItem
                  to="/register"
                  onClick={() => {
                    handleNavbarToggle();
                  }}
                  style={{ textDecoration: "none", color: "#f578a6" }}
                >
                  <FaIcons.FaUserPlus /> Register
                </MobileNavItem>
                <MobileNavItem
                  to="/login"
                  onClick={() => {
                    handleNavbarToggle();
                  }}
                  style={{ textDecoration: "none", color: "#f578a6" }}
                >
                  <FaIcons.FaSignInAlt /> Log In
                </MobileNavItem>
              </>
            )}
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

  color: #fff5fa;
`;

const MobileNavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  height: 70vh;
  border: 1px solid red;

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
