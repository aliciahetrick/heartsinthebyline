import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../features/api";
import styled from "styled-components";
import { useState } from "react";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  // console.log("user", user);
  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          console.log("inside if");
          window.location.href = response.data.url;
        }
      })
      .catch((response) => {
        setError(true);
        const notEnoughStockItems = response.response.data.filter(
          (item) => item.price_data.product_data.metadata.stock < item.quantity
        );

        setErrorMessage([
          ...errorMessage,
          ...notEnoughStockItems.map((item) => {
            const stock = item.price_data.product_data.metadata.stock;
            const name = item.price_data.product_data.name;
            if (stock <= 1) {
              return `There is only ${stock} ${name} left`;
            } else {
              return `There are only ${stock} ${name}s left`;
            }
          }),
        ]);
      });
  };

  return (
    <>
      {error ? (
        <>
          {errorMessage.map((error) => {
            return <div>{error}</div>;
          })}
        </>
      ) : null}
      <CheckoutButton
        onClick={() => {
          handleCheckout();
        }}
      >
        Checkout
      </CheckoutButton>
    </>
  );
};

export default PayButton;

const CheckoutButton = styled.button`
  display: flex;
  width: 150px;
  height: 40px;
  background-color: #f578a6;
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin-left: auto;
  margin-right: auto;
  font-family: "Raleway", sans-serif;
  border-radius: 0.5em;
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
