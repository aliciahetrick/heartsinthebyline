import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart, getTotals } from "../features/cartSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
    dispatch(getTotals());
  }, [dispatch]);
  return (
    <>
      <h2>Checkout Success</h2>
    </>
  );
};

export default CheckoutSuccess;
