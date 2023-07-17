// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
// import { useState } from "react";
import { Link } from "react-router-dom";
// import { logoutUser } from "../../features/authSlice";

import styled from "styled-components/macro";
import "../../fonts/AmerikaSignature.ttf";
// import * as FaIcons from "react-icons/fa";

const NavbarMobile = () => {
  // const dispatch = useDispatch();
  const { cartTotalQty } = useSelector((state) => state.cart);
  // const auth = useSelector((state) => state.auth);

  return (
    <NavContainer style={{ backgroundColor: "#ffd4e9" }}>
      <TitleLink to="/">heartsinthebyline</TitleLink>
      <MobileNavItems>
        <MobileNavItem
          to="/"
          style={{ textDecoration: "none", color: "#f578a6" }}>
          {/* <FaIcons.FaHome />  */}
          Home
        </MobileNavItem>
        <MobileNavItem
          to="/products"
          style={{ textDecoration: "none", color: "#f578a6" }}>
          {/* <FaIcons.FaHeart />  */}
          Products
        </MobileNavItem>
        <MobileNavItem
          to="/faq"
          style={{ textDecoration: "none", color: "#f578a6" }}>
          {/* <FaIcons.FaHeart />  */}
          FAQ
        </MobileNavItem>
        <MobileNavItem
          to="/contact"
          style={{ textDecoration: "none", color: "#f578a6" }}>
          {/* <FaIcons.FaHeart />  */}
          Contact
        </MobileNavItem>
        <MobileNavItem
          to="/cart"
          style={{ textDecoration: "none", color: "#f578a6" }}>
          {/* <FaIcons.FaShoppingCart />  */}
          Cart({cartTotalQty})
        </MobileNavItem>
        {/* {auth._id ? (
              <>
                {auth.isAdmin ? (
                  <div>
                    <MobileNavItem
                      to="/admin/summary"
            
                      style={{ textDecoration: "none", color: "#f578a6" }}>
                      <FaIcons.FaKey /> 
                      Admin
                    </MobileNavItem>
                  </div>
                ) : null}

                <div
                  onClick={() => {
                    dispatch(logoutUser(null));
                  }}>
                  <MobileNavItem
                    to="/"
                   
                    style={{ textDecoration: "none", color: "#f578a6" }}>
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
                  style={{ textDecoration: "none", color: "#f578a6" }}>
                  <FaIcons.FaUserPlus /> 
                  Register
                </MobileNavItem>
                <MobileNavItem
                  to="/login"
                  onClick={() => {
                    handleNavbarToggle();
                  }}
                  style={{ textDecoration: "none", color: "#f578a6" }}>
                  <FaIcons.FaSignInAlt /> 
                  Log In
                </MobileNavItem>
              </>
            )} */}
      </MobileNavItems>
    </NavContainer>
  );
};

export default NavbarMobile;

const NavContainer = styled.div`
  // position: sticky;
  // overflow: hidden;
`;

const TitleLink = styled(Link)`
  // top: 0;
  // background-color: #fff5fa;
  display: inline-block;
  text-decoration: none;
  color: #f578a6;
  font-size: 70px;
  line-height: 80px;
  font-family: "AmerikaSignature";
  // padding-top: -1em;
  // margin-top: -0.4em;
  // margin-bottom: -0.8em;
`;

// const MobileHeaderContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const HamburgerIcon = styled.div`
//   position: absolute;
//   left: 0;
//   justify-content: left;
//   padding-top: 15px;
//   padding-left: 15px;
//   color: #f578a6;
// `;

// const MobileNavToggled = styled.div`
//   background-color: #ffd4e9;
//   // height: 100vh;
// `;

// const CloseNavButton = styled.div`
//   position: absolute;
//   right: 0;
//   justify-content: right;
//   padding-top: 15px;
//   padding-right: 15px;
//   color: #f578a6;
// `;

const MobileNavItems = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  gap: 1em;
  // height: 70vh;
  // border: 1px solid green;
  text-decoration: none;
  background-color: rgb(255, 228, 241);
  // color: white;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 15px;
  margin-top: 10px;
  text-transform: uppercase;

  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

const MobileNavItem = styled(Link)``;
