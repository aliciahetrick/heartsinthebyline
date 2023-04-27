import { useEffect } from "react";

const CheckoutSuccess = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      <h2>Checkout Success</h2>
    </>
  );
};

export default CheckoutSuccess;
