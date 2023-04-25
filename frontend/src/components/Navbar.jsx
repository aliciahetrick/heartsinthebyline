import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartTotalQty } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  return (
    <nav style={{ backgroundColor: "pink" }}>
      <Link to="/">Home</Link>
      {/* <Link to="/register">Register</Link> */}
      {auth._id ? (
        <>
          <div>
            <Link to="/admin/summary">Admin</Link>
          </div>
          <div
            onClick={() => {
              dispatch(logoutUser(null));
            }}
          >
            <Link to="/">Log Out</Link>
          </div>
        </>
      ) : (
        <div>
          <Link to="/register">Register</Link>
          <Link to="/login">Log In</Link>
        </div>
      )}
      {/* <Link to="/login">Log In</Link> */}
      <Link to="/products">Products</Link>
      <Link to="/">heartsinthebyline</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/cart">Cart({cartTotalQty})</Link>
    </nav>
  );
};

export default Navbar;
