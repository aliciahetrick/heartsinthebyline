import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotals } from "../features/cartSlice";
import { updateProductAsync } from "../features/productsSlice";
import { Stars } from "./Stars";

const CheckoutSuccess = () => {
  const { updateStockStatus } = useSelector((state) => state.products);

  const paidCart = JSON.parse(localStorage.getItem("cartItems"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());

    paidCart?.map((cartItem) => {
      const updateObject = {
        url: cartItem.id,
        cartQty: cartItem.cartQty,
      };
      return dispatch(updateProductAsync(updateObject));
    });

    dispatch(clearCart());
  }, [dispatch, paidCart]);

  return (
    <>
      {updateStockStatus === "rejected" ? (
        <h2>There was not enough stock</h2>
      ) : (
        <>
          <Stars amount={16} color={GOLD_COLOR} />
          <h2>Checkout Success</h2>
        </>
      )}
    </>
  );
};

export default CheckoutSuccess;

const GOLD_COLOR = "#ffd700";
