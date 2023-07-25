import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import store from "./features";
import { getTotals } from "./features/cartSlice";
import { loadUser } from "./features/authSlice";

import { GlobalStyles } from "./globalStyles";

store.dispatch(getTotals());
store.dispatch(loadUser(null));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
  // </React.StrictMode>
);
