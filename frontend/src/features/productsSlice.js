import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
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

export const createProductAsync = createAsyncThunk(
  "products/createProductAsync",
  async (values) => {
    console.log("values", values);
    try {
      const response = await axios.post(
        `${url}/products`,
        // "http://localhost:5000/api/products",
        values
      );
      console.log("fetch response", response);
      return response.data;
    } catch (error) {
      console.log("post error", error);
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(createProductAsync.pending, (state, action) => {
      state.createStatus = "pending";
    });
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
    });
    builder.addCase(createProductAsync.rejected, (state, action) => {
      state.createStatus = "rejected";
      console.log("rejected", action.error);
    });
  },
});

export const selectAllProducts = (state) => {
  return state;
};

export default productsSlice.reducer;
