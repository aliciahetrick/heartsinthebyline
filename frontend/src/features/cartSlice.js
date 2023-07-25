import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log("action", action);

      const itemIndex = state.cartItems.findIndex(
        (cartItem) =>
          cartItem.id === action.payload[0].id &&
          cartItem.cartGrade === action.payload[1]
      );

      // if item already in cart
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQty += 1;
        state.cartItems[itemIndex].cartGrade = action.payload[1];
      } else {
        const tempProduct = {
          ...action.payload[0],
          cartQty: 1,
          cartGrade: action.payload[1],
        };
        state.cartItems.push(tempProduct);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (
          cartItem.id === action.payload.id &&
          cartItem.cartGrade === action.payload.cartGrade
        ) {
          const filteredCartItems = state.cartItems.filter(
            (item) =>
              `${item.id}${item.cartGrade}` !==
              `${cartItem.id}${cartItem.cartGrade}`
          );
          state.cartItems = filteredCartItems;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },

    decreaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload[0].id
      );
      if (state.cartItems[itemIndex].cartQty > 1) {
        state.cartItems[itemIndex].cartQty -= 1;
      } else if (state.cartItems[itemIndex].cartQty === 1) {
        const filterCartItems = state.cartItems.filter((cartItem) => {
          return (
            `${action.payload[0].id}${action.payload[1]}` !==
            `${cartItem.id}${cartItem.cartGrade}`
          );
        });

        state.cartItems = filterCartItems;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { cartQty } = cartItem;
          const price =
            cartItem.price || cartItem[`price${cartItem.cartGrade}`];
          const itemTotal = price * cartQty;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQty;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQty = quantity;
      state.cartTotalPrice = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCartQuantity,
  clearCart,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
