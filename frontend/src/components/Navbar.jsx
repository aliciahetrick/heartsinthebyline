import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/">heartsinthebyline</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  );
};

export default Navbar;
