import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

const initialState = {
  items: [],
  status: null,
  singleProduct: {},
  singleProductStatus: null,
  createStatus: null,
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);
      console.log("fetch response", response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// a redux thunk that fetches a single post from the database
export const fetchSingleProductAsync = createAsyncThunk(
  "products/fetchSingleProductAsync",
  async (_id) => {
    try {
      const { data } = await axios.get(`${url}/products/${_id}`);
      console.log("fetch response", data);
      return data;
    } catch (error) {
      console.log("thunk error", error);
    }
  }
);

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
    builder.addCase(fetchProductsAsync.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      console.log("fulfilled", action.payload);
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.status = "rejected";
    });

    builder.addCase(fetchSingleProductAsync.pending, (state, action) => {
      state.singleProductStatus = "pending";
    });
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      console.log("fulfilled", action.payload);
      state.singleProduct = action.payload;
      state.singleProductStatus = "success";
    });
    builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
      state.singleProductStatus = "rejected";
    });

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
