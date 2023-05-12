import CartMobile from "./CartMobile";
import CartTablet from "./CartTablet";
import { useWindowDimensions } from "../constants/useWindowDimensions";

const Cart = () => {
  const { width } = useWindowDimensions();
  return <>{width < 500 ? <CartMobile /> : <CartTablet />}</>;
};

export default Cart;
