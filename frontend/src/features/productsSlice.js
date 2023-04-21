import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

// export const fetchProductsAsync = createAsyncThunk(
//   "products/fetchAllProducts",
//   async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/products");
//       //   console.log("fetch response", response);
//       return response?.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchProductsAsync.pending, (state, action) => {
  //       //   state.status = "pending";
  //       console.log("pending");
  //       return {
  //         status: "pending",
  //         items: state.items,
});

export const selectAllProducts = (state) => {
  return state;
};

export default productsSlice.reducer;
