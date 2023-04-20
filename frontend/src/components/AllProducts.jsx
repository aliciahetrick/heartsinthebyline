import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchProductsAsync,
  selectAllProducts,
} from "../features/productsSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  // const allProducts = useSelector(selectAllProducts);
  const allProducts = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  console.log("products", allProducts);
  console.log("items", allProducts.items);
  return (
    <>
      <h2> this is the all products page</h2>
      <div>
        {allProducts &&
          allProducts.items?.map((product) => {
            return (
              <div key={product.id}>
                <h2>name: {product.name}</h2>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AllProducts;
