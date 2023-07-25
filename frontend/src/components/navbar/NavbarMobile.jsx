// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
// import { useState } from "react";
import { Link } from "react-router-dom";
// import { logoutUser } from "../../features/authSlice";

import styled from "styled-components/macro";
import "../../fonts/AmerikaSignature.ttf";

const NavbarMobile = () => {
  const { cartTotalQty } = useSelector((state) => state.cart);

  return (
    <NavContainer style={{ backgroundColor: "#ffd4e9" }}>
      <TitleLink to="/">heartsinthebyline</TitleLink>
      <MobileNavItems>
        <MobileNavItem
          to="/"
          style={{ textDecoration: "none", color: "#f578a6" }}>
          Home
        </MobileNavItem>
        <MobileNavItem
          to="/products"
          style={{ textDecoration: "none", color: "#f578a6" }}>
          Products
        </MobileNavItem>
        <MobileNavItem
          to="/faq"
          style={{ textDecoration: "none", color: "#f578a6" }}>
          FAQ
        </MobileNavItem>
        <MobileNavItem
          to="/contact"
          style={{ textDecoration: "none", color: "#f578a6" }}>
          Contact
        </MobileNavItem>
        <MobileNavItem
          to="/cart"
          style={{ textDecoration: "none", color: "#f578a6" }}>
          Cart({cartTotalQty})
        </MobileNavItem>
        {/* {auth._id ? (
              <>
                {auth.isAdmin ? (
                  <div>
                    <MobileNavItem
                      to="/admin/summary"
                      style={{ textDecoration: "none", color: "#f578a6" }}>
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
                  Register
                </MobileNavItem>
                <MobileNavItem
                  to="/login"
                  onClick={() => {
                    handleNavbarToggle();
                  }}
                  style={{ textDecoration: "none", color: "#f578a6" }}>
                  Log In
                </MobileNavItem>
              </>
            )} */}
      </MobileNavItems>
    </NavContainer>
  );
};

export default NavbarMobile;

const NavContainer = styled.div``;

const TitleLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #f578a6;
  font-size: 70px;
  line-height: 80px;
  font-family: "AmerikaSignature";
`;

const MobileNavItems = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  text-decoration: none;
  background-color: rgb(255, 228, 241);
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 15px;
  margin-top: 10px;
  text-transform: uppercase;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

const MobileNavItem = styled(Link)``;
