import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";
import Home from "./components/Home";
import FAQ from "./components/FAQ";
import AllProducts from "./components/products/AllProducts";
import SingleProduct from "./components/products/SingleProduct";
import NotFound from "./components/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Contact from "./components/Contact";

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProducts from "./components/admin/AdminProducts";
import AdminSummary from "./components/admin/AdminSummary";
import CreateProduct from "./components/admin/CreateProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/products/:id" element={<SingleProduct />} />
          <Route exact path="/products" element={<AllProducts />} />
          <Route exact path="/faq" element={<FAQ />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout-success" element={<CheckoutSuccess />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="summary" element={<AdminSummary />} />
            <Route path="products" element={<AdminProducts />}>
              <Route path="create" element={<CreateProduct />} />
            </Route>
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
