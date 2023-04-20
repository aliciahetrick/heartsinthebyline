import "./App.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
