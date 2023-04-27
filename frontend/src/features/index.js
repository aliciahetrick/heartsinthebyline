import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer, { getTotals } from "./cartSlice";
// import { productsApi } from "./productsApi";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    // [productsApi.reducerPath]: productsApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(productsApi.middleware);
  // },
});

store.dispatch(getTotals());

export default store;
