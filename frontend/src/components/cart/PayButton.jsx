import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../features/api";
import styled from "styled-components";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  // console.log("user", user);
  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log("stripe error", err));
  };

  return (
    <>
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
