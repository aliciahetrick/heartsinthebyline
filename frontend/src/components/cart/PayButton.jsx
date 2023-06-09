import { useSelector } from "react-redux";
import { url } from "../../features/api";
import styled from "styled-components/macro";
import { useState } from "react";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  // console.log("user", user);

  const handleCheckout = async () => {
    setError(false);
    setErrorMessage([]);
    await fetch(`${url}/stripe/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        userId: user.id,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const jsonResponse = await response.json();
          window.location.href = await jsonResponse.url;
        } else {
          setError(true);
          const jsonResponse = await response.json();
          const notEnoughStockItemsPins = await jsonResponse.data.filter(
            (item) =>
              Number(
                item.price_data.product_data.metadata[
                  `stock${item.price_data.product_data.metadata.cartGrade}`
                ]
              ) < item.quantity &&
              item.price_data.product_data.metadata.type === "pin"
          );

          const notEnoughStockItemsOther = await jsonResponse.data.filter(
            (item) =>
              Number(item.price_data.product_data.metadata.stock) <
                item.quantity &&
              item.price_data.product_data.metadata.type === "sticker"
          );

          const notEnoughStockItems = [
            ...notEnoughStockItemsPins,
            ...notEnoughStockItemsOther,
          ];

          console.log("notEnoughStockItems", notEnoughStockItems);

          setErrorMessage([
            ...notEnoughStockItems.map((item) => {
              const grade = item.price_data.product_data.metadata.cartGrade;
              const stockGrade = "stock" + grade;
              const stock =
                item.price_data.product_data.metadata.stock ||
                item.price_data.product_data.metadata[stockGrade];
              const name = item.price_data.product_data.name;
              if (stock <= 1) {
                return `There is only ${stock} ${name} in stock`;
              } else {
                return `There are only ${stock} ${name}s in stock`;
              }
            }),
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {error ? (
        <>
          {errorMessage.map((error) => {
            return <CheckoutError key={error}>{error}</CheckoutError>;
          })}
        </>
      ) : null}
      <CheckoutButton
        onClick={() => {
          handleCheckout();
        }}>
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

const CheckoutError = styled.div`
  color: #f578a6;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  // border: 1px solid blue;
`;
