import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQty: 0,
  cartTotalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
      //   state.cartTotalQty += action.payload.qty;
      //   state.cartTotalPrice += action.payload.price * action.payload.qty;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
