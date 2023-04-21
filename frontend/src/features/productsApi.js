import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// creating a new api service, which helps fetch data from backend api
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => fetch("products"),
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
