import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCartQuantity,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import PayButton from "./PayButton";

import styled from "styled-components";
import { BREAKPOINTS } from "../constants/breakpoints";

const Cart = () => {
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

  const handleClearCart = () => {
    dispatch(clearCart());
  };

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
            {cart.cartItems.map((cartItem) => {
              return (
                <CartItemContainer key={cartItem._id}>
                  <div>
                    <Link
                      to={`/products/${cartItem.url}`}
                      style={{ textDecoration: "none" }}
                    >
                      <CartItemImage
                        src={cartItem.image.url}
                        alt={cartItem.name}
                        // style={{ width: "300px" }}
                      />
                      <CartItemName>{cartItem.name}</CartItemName>
                    </Link>
                    <p>${cartItem.price} each</p>
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
                    <p>Total: ${cartItem.price * cartItem.cartQty}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      Remove
                    </button>
                  </div>
                </CartItemContainer>
              );
            })}
          </AllCartItemsContainer>
          <div>
            <button onClick={() => handleClearCart()}>Clear cart</button>
            <p>Taxes and shipping calculated at checkout</p>
            <p>Subtotal: ${cart.cartTotalPrice}</p>
            <PayButton cartItems={cart.cartItems} />
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

const WrapperTitle = styled.h1`
  color: #f578a6;
  text-align: center;
  font-size: 1.5rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const AllCartItemsContainer = styled.div`
  @media only screen and (min-width: ${BREAKPOINTS.medium}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    flex-wrap: wrap;
    margin-left: 10%;
    margin-right: 10%;
  }
`;

const CartItemContainer = styled.div`
  padding-bottom: 3em;
  // border-bottom: 3px solid pink;
  &::after {
    content: "";
    position: absolute;
    margin: auto;
    margin-top: 1em;
    right: 0;
    left: 0;
    width: 50%;
    height: 2px;
    background-color: pink;
  }
`;

const CartItemImage = styled.img`
  width: 250px;
  border-radius: 1em;
  @media only screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 300px;
  }
`;

const CartItemName = styled.h2`
  color: #f578a6;
  text-align: center;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 0.5em;
  @media only screen and (min-width: ${BREAKPOINTS.medium}) {
    max-width: 300px;
  }
`;

const CartQuantityButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CartQuantityButtonMinus = styled.button`
  background-color: #f578a6;
  color: white;
  padding: 0.5em;
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  border: none;
  padding-left: 1em;
`;

const CartQuantityNumber = styled.div`
  background-color: #f578a6;
  color: white;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
`;

const CartQuantityButtonPlus = styled.button`
  background-color: #f578a6;
  color: white;
  padding: 0.5em;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  border: none;
  padding-right: 1em;
`;
