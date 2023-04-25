import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <div>
        <h3>Quick Links</h3>
        <NavLink
          to="/admin/summary"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
          Summary
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
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
