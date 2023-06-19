import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  decreaseCartQuantity,
  getTotals,
  removeFromCart,
} from "../../features/cartSlice";
import PayButton from "./PayButton";

import styled from "styled-components";

const CartMobile = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleDecreaseCartQuantity = (product, grade) => {
    dispatch(decreaseCartQuantity(product, grade));
  };

  const handleIncreaseCartQuantity = (product, grade) => {
    dispatch(addToCart(product, grade));
  };

  const handleRemoveFromCart = ([cartItem, grade]) => {
    console.log("removed grade", grade);
    dispatch(removeFromCart(cartItem, grade));
  };

  // console.log("cart", cart);

  return (
    <>
      <WrapperPageTitle>Cart</WrapperPageTitle>
      {cart.cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <div>
            <Link to="/products">Start shopping</Link>
          </div>
        </div>
      ) : (
        <div>
          {cart.cartItems.map((cartItem) => {
            return (
              <SingleCartItemContainer key={cartItem.id + cartItem.cartGrade}>
                <SingleCartItemContainerLeft>
                  <Link to={`/products/${cartItem.id}`}>
                    <SingleCartItemImage
                      src={cartItem.image_url}
                      alt={cartItem.name}
                      style={{ width: "80px" }}
                    />
                  </Link>
                </SingleCartItemContainerLeft>
                <SingleCartItemContainerRight>
                  <SingleCartItemDetailsTop>
                    <SingleCartItemTitle>{cartItem.name}</SingleCartItemTitle>
                    <SingleCartItemPrice>
                      $
                      {cartItem.price || cartItem[`price${cartItem.cartGrade}`]}{" "}
                      each
                    </SingleCartItemPrice>
                    {cartItem.type === "pin" ? (
                      <SingleCartItemPrice>
                        Grade: {cartItem.cartGrade}
                      </SingleCartItemPrice>
                    ) : null}
                  </SingleCartItemDetailsTop>
                  <SingleCartItemDetailsBottom>
                    <CartQuantityButtonContainer>
                      <CartQuantityButtonMinus
                        onClick={() =>
                          handleDecreaseCartQuantity([
                            cartItem,
                            cartItem.cartGrade,
                          ])
                        }>
                        -
                      </CartQuantityButtonMinus>
                      <CartQuantityNumber>
                        {cartItem.cartQty}
                      </CartQuantityNumber>
                      <CartQuantityButtonPlus
                        onClick={() =>
                          handleIncreaseCartQuantity([
                            cartItem,
                            cartItem.cartGrade,
                          ])
                        }>
                        +
                      </CartQuantityButtonPlus>
                    </CartQuantityButtonContainer>

                    <RemoveCartItemButton
                      onClick={() =>
                        handleRemoveFromCart([cartItem, cartItem.cartGrade])
                      }>
                      Remove
                    </RemoveCartItemButton>
                  </SingleCartItemDetailsBottom>
                </SingleCartItemContainerRight>
              </SingleCartItemContainer>
            );
          })}
          <CartCheckoutContainer>
            {/* <button onClick={() => handleClearCart()}>Clear cart</button> */}
            <CheckoutBlurb>
              Shipping & taxes calculated at checkout
            </CheckoutBlurb>
            <CheckoutTotal>Total: ${cart.cartTotalPrice}</CheckoutTotal>

            <PayButton cartItems={cart.cartItems} />
          </CartCheckoutContainer>
        </div>
      )}
    </>
  );
};

export default CartMobile;

const WrapperPageTitle = styled.h1`
  color: #f578a6;
  text-align: center;
  font-size: 1.5rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 1em;
  // margin-bottom: 1em;
`;

const SingleCartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 1em;
  padding-top: 1em;

  // &::after {
  //   content: "";
  //   position: absolute;
  //   margin: auto;
  //   margin-top: 6em;
  //   right: 0;
  //   left: 0;
  //   width: 90%;
  //   height: 2px;
  //   background-color: pink;
  // }
`;

const SingleCartItemContainerLeft = styled.div`
  width: 25%;
  // border: 1px solid red;
`;

const SingleCartItemImage = styled.img`
  border-radius: 0.5em;
`;

const SingleCartItemContainerRight = styled.div`
  width: 75%;
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SingleCartItemDetailsTop = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8%;
  text-align: left;
  // border: 1px solid orange;
  // height: 50%;
`;

const SingleCartItemTitle = styled.p`
  text-align: left;
  // border: 1px solid green;
  margin-top: 0;
  margin-bottom: 0;

  color: #f578a6;
  font-weight: bold;
  text-align: left;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const SingleCartItemPrice = styled.p`
  text-align: left;
  // border: 1px solid green;
  margin-top: 0;

  color: pink;
  font-weight: bold;
  text-align: left;
  font-size: 0.7rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const SingleCartItemDetailsBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 8%;

  &::after {
    content: "";
    position: absolute;
    margin: auto;
    margin-top: 2.5em;
    right: 0;
    left: 0;
    width: 90%;
    height: 2px;
    background-color: pink;
  }
`;

const CartQuantityButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CartQuantityButtonMinus = styled.button`
  background-color: #f578a6;
  color: white;
  padding: 0.3em;

  border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  border: none;
  padding-left: 0.5em;
`;

const CartQuantityNumber = styled.div`
  background-color: #f578a6;
  font-family: "Raleway", sans-serif;
  color: white;
  padding: 0.3em;
  padding-left: 0.5em;
  padding-right: 0.5em;
`;

const CartQuantityButtonPlus = styled.button`
  background-color: #f578a6;
  color: white;
  padding: 0.3em;
  border-top-right-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  border: none;
  padding-right: 0.5em;
`;

const RemoveCartItemButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: underline;

  color: pink;
  font-size: 0.8em;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const CartCheckoutContainer = styled.div`
  padding-top: 0.5em;
  padding-bottom: 1em;
`;

const CheckoutBlurb = styled.p`
  color: pink;
  font-weight: bold;
  font-size: 0.7rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const CheckoutTotal = styled.p`
  color: #f578a6;
  font-weight: bold;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;
