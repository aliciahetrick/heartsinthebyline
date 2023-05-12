import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  // clearCart,
  decreaseCartQuantity,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import PayButton from "./PayButton";

import styled from "styled-components";
import { BREAKPOINTS } from "../constants/breakpoints";

const CartTablet = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  console.log(cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleDecreaseCartQuantity = (product) => {
    dispatch(decreaseCartQuantity(product));
  };

  const handleIncreaseCartQuantity = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  // const handleClearCart = () => {
  //   dispatch(clearCart());
  // };

  return (
    <>
      <WrapperTitle>Cart</WrapperTitle>
      {cart.cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <div>
            <Link to="/products">Start shopping</Link>
          </div>
        </div>
      ) : (
        <>
          <AllCartItemsContainer>
            <HeadingWrapper>
              <ProductWrapper>Product</ProductWrapper>
              <QuantityWrapper>Quantity</QuantityWrapper>
              <TotalWrapper>Total</TotalWrapper>
            </HeadingWrapper>
            {cart.cartItems.map((cartItem) => {
              return (
                <CartItemContainer key={cartItem._id}>
                  <>
                    <CartItemLeftWrapper
                      to={`/products/${cartItem.url}`}
                      style={{ textDecoration: "none" }}
                    >
                      <CartItemImage
                        src={cartItem.image.url}
                        alt={cartItem.name}
                        // style={{ width: "300px" }}
                      />
                      <CartItemDetailsWrapper>
                        <CartItemName>{cartItem.name}</CartItemName>
                        <CartItemPrice>${cartItem.price} each</CartItemPrice>
                      </CartItemDetailsWrapper>
                    </CartItemLeftWrapper>
                    <CartItemMiddleWrapper>
                      <CartQuantityButtonContainer>
                        <CartQuantityButtonMinus
                          onClick={() => handleDecreaseCartQuantity(cartItem)}
                        >
                          -
                        </CartQuantityButtonMinus>
                        <CartQuantityNumber>
                          {cartItem.cartQty}
                        </CartQuantityNumber>
                        <CartQuantityButtonPlus
                          onClick={() => handleIncreaseCartQuantity(cartItem)}
                        >
                          +
                        </CartQuantityButtonPlus>
                      </CartQuantityButtonContainer>
                      <RemoveCartItemButton
                        onClick={() => handleRemoveFromCart(cartItem)}
                      >
                        Remove
                      </RemoveCartItemButton>
                    </CartItemMiddleWrapper>
                    <CartItemRightWrapper>
                      <CartItemTotal>
                        ${cartItem.price * cartItem.cartQty}
                      </CartItemTotal>
                    </CartItemRightWrapper>
                  </>
                </CartItemContainer>
              );
            })}
          </AllCartItemsContainer>
          <CartCheckoutContainer>
            {/* <button onClick={() => handleClearCart()}>Clear cart</button> */}
            <CheckoutBlurb>
              Shipping & taxes calculated at checkout
            </CheckoutBlurb>
            <CheckoutTotal>Total: ${cart.cartTotalPrice}</CheckoutTotal>

            <PayButton cartItems={cart.cartItems} />
          </CartCheckoutContainer>
        </>
      )}
    </>
  );
};

export default CartTablet;

const WrapperTitle = styled.h1`
  color: #f578a6;
  text-align: center;
  font-size: 1.5rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const HeadingWrapper = styled.div`
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
  // border: 1px solid red;
  color: #f578a6;
  text-align: center;
  font-size: 0.5rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  &::after {
    content: "";
    position: absolute;
    margin: auto;
    margin-top: 4em;
    width: 80%;
    height: 2px;
    background-color: pink;
  }
`;

const ProductWrapper = styled.h2`
  width: 60%;
  text-align: left;
  // border: 1px solid green;
`;
const QuantityWrapper = styled.h2`
  width: 20%;
  // border: 1px solid green;
`;

const TotalWrapper = styled.h2`
  width: 20%;
  // border: 1px solid green;
`;

const AllCartItemsContainer = styled.div`
  @media only screen and (min-width: ${BREAKPOINTS.medium}) {
    // display: flex;
    // flex-direction: row;
    // justify-content: center;
    // gap: 1em;
    // flex-wrap: wrap;
    // margin-left: 10%;
    // margin-right: 10%;
  }
`;

const CartItemContainer = styled.div`
  display: flex;
  padding-bottom: 2em;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 2em;

  border-bottom: 2px solid pink;
  // &::after {
  //   content: "";
  //   position: absolute;
  //   margin: auto;
  //   margin-top: 1em;
  //   right: 0;
  //   left: 0;
  //   width: 80%;
  //   height: 2px;
  //   background-color: pink;
  // }
`;

const CartItemLeftWrapper = styled(Link)`
  width: 60%;
  display: flex;
`;

const CartItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 1em;
  // @media only screen and (min-width: ${BREAKPOINTS.medium}) {
  //   width: 300px;
  //   height: 300px;
  // }
`;

const CartItemDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1em;
`;

const CartItemName = styled.h2`
  color: #f578a6;
  text-align: left;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 0.5em;
  // border: 1px solid blue;
`;

const CartItemPrice = styled.h2`
  color: pink;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 0.5em;
  // border: 1px solid blue;
`;

const CartItemMiddleWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1em;
`;

const CartQuantityButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CartQuantityButtonMinus = styled.button`
  background-color: #f578a6;
  color: white;
  padding: 0.5em;

  border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  border: none;
  padding-left: 1em;
`;

const CartQuantityNumber = styled.div`
  background-color: #f578a6;
  font-family: "Raleway", sans-serif;
  color: white;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
`;

const CartQuantityButtonPlus = styled.button`
  background-color: #f578a6;
  color: white;
  padding: 0.5em;

  border-top-right-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  border: none;
  padding-right: 1em;
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
  font-size: 1em;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
`;

const CartItemRightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid green;
  width: 20%;
`;

const CartItemTotal = styled.h2`
  color: #f578a6;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 0.5em;
  // border: 1px solid blue;
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
