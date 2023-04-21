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
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // if item already in cart
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQty += 1;
      } else {
        const tempProduct = { ...action.payload, cartQty: 1 };
        state.cartItems.push(tempProduct);
      }

      //   state.cartTotalQty += action.payload.qty;
      //   state.cartTotalPrice += action.payload.price * action.payload.qty;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
