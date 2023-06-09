import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "./api";

const initialState = {
  items: [],
  status: null,
  singleProduct: {},
  singleProductStatus: null,
  createStatus: null,
  updateStockStatus: null,
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response = await fetch(`${url}/products`);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// a redux thunk that fetches a single post from the database
export const fetchSingleProductAsync = createAsyncThunk(
  "products/fetchSingleProductAsync",
  async (_id) => {
    try {
      const response = await fetch(`${url}/products/${_id}`);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log("thunk error", error);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "products/createProductAsync",
  async (values) => {
    try {
      const response = await fetch(`${url}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(values),
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log("post error", error);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProductAsync",
  async (
    { url: productUrl, cartQty: purchasedQuantity, type, cartGrade },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${url}/products/${productUrl}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          purchasedQuantity,
          type,
          cartGrade,
        }),
      });

      const resData = await response.json();
      if (!response.ok && resData?.error) {
        return rejectWithValue("There was an error in the backend");
      }
      return resData;
    } catch (error) {
      console.log("put thunk error", error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      // console.log("payload", action.payload);
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

    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.updateStockStatus = "rejected";
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {});
  },
});

export const selectAllProducts = (state) => {
  return state;
};

export default productsSlice.reducer;
