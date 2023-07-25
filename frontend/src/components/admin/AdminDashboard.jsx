import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin) {
    return <p>Access denied</p>;
  }
  return (
    <>
      <div>
        <h3>Quick Links</h3>
        <NavLink
          to="/admin/summary"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }>
          Summary
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }>
          Products
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
