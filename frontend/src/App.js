import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import NotFound from "./components/NotFound";
import SingleProduct from "./components/SingleProduct";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CheckoutSuccess from "./components/CheckoutSuccess";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/products/:id" element={<SingleProduct />} />
          <Route exact path="/products" element={<AllProducts />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout-success" element={<CheckoutSuccess />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
