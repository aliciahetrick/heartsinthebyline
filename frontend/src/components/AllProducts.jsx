import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../features/productsApi";
import {
  fetchProductsAsync,
  selectAllProducts,
} from "../features/productsSlice";

const AllProducts = () => {
  // const dispatch = useDispatch();
  // const allProducts = useSelector(selectAllProducts);
  // const allProducts = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(fetchProductsAsync());
  // }, [dispatch]);

  // console.log("products", allProducts);
  // console.log("items", allProducts.items);

  const { data: allProducts, error, isLoading } = useGetAllProductsQuery();
  console.log("query", allProducts);
  return (
    <>
      <h1>All Products</h1>
      <div>
        {allProducts &&
          allProducts.map((product) => {
            return (
              <div key={product.id}>
                <h2>{product.name}</h2>
                <img src={product.image} style={{ width: "300px" }} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AllProducts;
