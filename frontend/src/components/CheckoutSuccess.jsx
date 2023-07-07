import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotals } from "../features/cartSlice";
import { updateProductAsync } from "../features/productsSlice";
import { Stars } from "./Stars";
import styled from "styled-components/macro";

const CheckoutSuccess = () => {
  const { updateStockStatus } = useSelector((state) => state.products);

  const paidCart = JSON.parse(localStorage.getItem("cartItems"));

  const dispatch = useDispatch();

  console.log("paid cart", paidCart);

  useEffect(() => {
    dispatch(getTotals());

    paidCart?.map((cartItem) => {
      const updateObject = {
        url: cartItem.id,
        cartQty: cartItem.cartQty,
        type: cartItem.type,
        cartGrade: cartItem.cartGrade,
      };
      return dispatch(updateProductAsync(updateObject));
    });

    // make sure the clear cart runs after the update
    dispatch(clearCart());
  }, [dispatch, paidCart]);

  return (
    <>
      {updateStockStatus === "rejected" ? (
        <h2>There was not enough stock</h2>
      ) : (
        <>
          <Stars amount={16} color={GOLD_COLOR} />
          <Container>
            <Title>Checkout Success</Title>
            <ImageWrapper src="../../happy.gif" />
          </Container>
        </>
      )}
    </>
  );
};

export default CheckoutSuccess;

const GOLD_COLOR = "#ffd700";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6em;
  align-items: center;
`;

const ImageWrapper = styled.img`
  object-fit: cover;
  width: 200px;
  height: 200px;
  border-radius: 1.5em;
`;

const Title = styled.h2`
  text-align: center;
  color: #f578a6;
  font-family: Raleway;
  font-weight: 800;
  font-size: 20px;
  margin-top: 2em;
  text-transform: uppercase;
`;
