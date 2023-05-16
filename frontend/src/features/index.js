import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer, { getTotals } from "./cartSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

store.dispatch(getTotals());

export default store;
