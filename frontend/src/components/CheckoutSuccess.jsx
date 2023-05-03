import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../features/cartSlice";
import { updateProductAsync } from "../features/productsSlice";

const CheckoutSuccess = () => {
  const { updateStockStatus } = useSelector((state) => state.products);

  const paidCart = JSON.parse(localStorage.getItem("cartItems"));
  // console.log(paidCart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());

    paidCart.map((cartItem) => {
      const updateObject = {
        url: cartItem.url,
        name: cartItem.name,
        cartQty: cartItem.cartQty,
      };
      return dispatch(updateProductAsync(updateObject));
    });
  }, []);

  // TODO: clear the cart from local storage after checkout
  // clears the cart in local storage
  // useEffect(() => {
  //   console.log("paidCart", paidCart);
  //   dispatch(clearCart());
  //   dispatch(getTotals());
  // }, [paidCart]);

  return (
    <>
      {updateStockStatus === "rejected" ? (
        <h2>There was not enough stock</h2>
      ) : (
        <h2>Checkout Success</h2>
      )}
    </>
  );
};

export default CheckoutSuccess;
