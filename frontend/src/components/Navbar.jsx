import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cartTotalQty } = useSelector((state) => state.cart);
  return (
    <nav style={{ backgroundColor: "pink" }}>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/">heartsinthebyline</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/cart">Cart({cartTotalQty})</Link>
    </nav>
  );
};

export default Navbar;
