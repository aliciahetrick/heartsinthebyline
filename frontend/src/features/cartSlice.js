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

      console.log("itemIndex", itemIndex);
      console.log("state cart items", state.cartItems[0]);

      // if item already in cart
      if (itemIndex >= 0) {
        // if (
        //   state.cartItems[itemIndex].cartQty <
        //   Number(state.cartItems[itemIndex].stock)
        // ) {
        state.cartItems[itemIndex].cartQty += 1;
        state.cartItems[itemIndex].cartGrade = action.payload[1];
        // }
        console.log("added one to qty");
      } else {
        const tempProduct = {
          ...action.payload[0],
          cartQty: 1,
          cartGrade: action.payload[1],
        };
        state.cartItems.push(tempProduct);
        console.log("added new cart item");
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem._id === action.payload._id) {
          const filtedCartItems = state.cartItems.filter(
            (item) => item._id !== cartItem._id
          );

          state.cartItems = filtedCartItems;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    decreaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQty > 1) {
        state.cartItems[itemIndex].cartQty -= 1;
      } else if (state.cartItems[itemIndex].cartQty === 1) {
        const filterCartItems = state.cartItems.filter((cartItem) => {
          return cartItem.id !== action.payload.id;
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
