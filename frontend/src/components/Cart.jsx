import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
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
              <div key={cartItem.id}>
                <div>
                  <img
                    src={cartItem.image}
                    alt={cartItem.name}
                    style={{ width: "300px" }}
                  />
                  <p>{cartItem.name}</p>
                  <p>${cartItem.price} each</p>
                  <button>-</button>
                  <div>{cartItem.cartQty}</div>
                  <button>+</button>
                  <p>Total: ${cartItem.price * cartItem.cartQty}</p>
                  <button>Remove</button>
                </div>
              </div>
            );
          })}
          <div>
            <button>Clear cart</button>
            <p>Taxes and shipping calculated at checkout</p>
            <p>Subtotal: ${cart.cartTotalPrice}</p>
            <button>Checkout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
