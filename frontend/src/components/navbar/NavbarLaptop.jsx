// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../features/authSlice";

import styled from "styled-components";
import "../../fonts/AmerikaSignature.ttf";

const NavbarLaptop = () => {
  const dispatch = useDispatch();
  const { cartTotalQty } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  return (
    <nav style={{ backgroundColor: "#ffd4e9" }}>
      <>
        <TitleLink to="/products">heartsinthebyline</TitleLink>
        <WrapperNavBoth>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/faq">FAQ</NavLink>

          {auth._id ? (
            <>
              {auth.isAdmin ? (
                <div>
                  <NavLink
                    to="/admin/summary"
                    style={{ textDecoration: "none", color: "#f578a6" }}
                  >
                    Admin
                  </NavLink>
                </div>
              ) : null}

              <div
                onClick={() => {
                  dispatch(logoutUser(null));
                }}
              >
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "#f578a6" }}
                >
                  Log Out
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                style={{ textDecoration: "none", color: "#f578a6" }}
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "#f578a6" }}
              >
                Log In
              </NavLink>
            </>
          )}
          <NavLink to="/cart">Cart ({cartTotalQty})</NavLink>
        </WrapperNavBoth>
      </>
    </nav>
  );
};

export default NavbarLaptop;

const WrapperNavBoth = styled.div`
  display: flex;
  // background-color: #fff5fa;
  justify-content: center;
  padding-bottom: 1.5em;
`;

const TitleLink = styled(Link)`
  display: flex;
  top: 0;
  // background-color: #fff5fa;
  display: inline-block;
  text-decoration: none;
  color: #f578a6;
  font-size: 100px;
  padding-top: 0;
  // margin-top: 10px;
  /* margin-left: 15px; */

  font-family: "AmerikaSignature";
`;

const NavLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #f578a6;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 15px;
  margin-left: 15px;
  margin-right: 15px;
  text-transform: uppercase;
`;
