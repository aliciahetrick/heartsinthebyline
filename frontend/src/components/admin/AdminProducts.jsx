import { Outlet, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/admin/products/create")}>Create</button>
      <Outlet />
    </>
  );
};

export default AdminProducts;
