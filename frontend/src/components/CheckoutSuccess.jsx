import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart, getTotals } from "../features/cartSlice";

const CheckoutSuccess = () => {
  const paidCart = localStorage.getItem("cartItems");
  console.log(paidCart);
  // const [paidCart, setPaidCart] = useState([]);

  const dispatch = useDispatch();

  // sets the state of the checked out cart
  useEffect(() => {
    // setPaidCart(localStorage.getItem("cartItems"));
    // dispatch(clearCart());
    dispatch(getTotals());
  }, []);

  // clears the cart in local storage
  // useEffect(() => {
  //   console.log("paidCart", paidCart);
  //   dispatch(clearCart());
  //   dispatch(getTotals());
  // }, [paidCart]);

  return (
    <>
      <h2>Checkout Success</h2>
      <h1>{paidCart[0].name}</h1>
    </>
  );
};

export default CheckoutSuccess;
