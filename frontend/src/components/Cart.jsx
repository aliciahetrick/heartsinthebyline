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
      <h2>Cart</h2>
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
              <div key={cartItem._id}>
                <div>
                  <Link to={`/products/${cartItem.url}`}>
                    <img
                      src={cartItem.image.url}
                      alt={cartItem.name}
                      style={{ width: "300px" }}
                    />
                    <p>{cartItem.name}</p>
                  </Link>
                  <p>${cartItem.price} each</p>
                  <button onClick={() => handleDecreaseCartQuantity(cartItem)}>
                    -
                  </button>
                  <div>{cartItem.cartQty}</div>
                  <button onClick={() => handleIncreaseCartQuantity(cartItem)}>
                    +
                  </button>
                  <p>Total: ${cartItem.price * cartItem.cartQty}</p>
                  <button onClick={() => handleRemoveFromCart(cartItem)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div>
            <button onClick={() => handleClearCart()}>Clear cart</button>
            <p>Taxes and shipping calculated at checkout</p>
            <p>Subtotal: ${cart.cartTotalPrice}</p>
            <PayButton cartItems={cart.cartItems} />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
