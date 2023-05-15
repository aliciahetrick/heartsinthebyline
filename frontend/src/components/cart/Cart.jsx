import CartMobile from "./CartMobile";
import CartLaptop from "./CartLaptop";
import { useWindowDimensions } from "../../constants/useWindowDimensions";

const Cart = () => {
  const { width } = useWindowDimensions();
  return <>{width < 500 ? <CartMobile /> : <CartLaptop />}</>;
};

export default Cart;
