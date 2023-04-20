import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/products" element={<AllProducts />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
