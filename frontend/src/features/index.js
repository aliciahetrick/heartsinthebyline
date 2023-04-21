import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import { productsApi } from "./productsApi";

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

export default store;
