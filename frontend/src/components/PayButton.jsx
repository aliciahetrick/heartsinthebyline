import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../features/api";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  const handleCheckout = () => {
    axios
      .post(`${url}/api/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button
        onClick={() => {
          handleCheckout();
        }}
      >
        Checkout
      </button>
    </>
  );
};

export default PayButton;
