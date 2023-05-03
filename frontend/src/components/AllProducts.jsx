import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useGetAllProductsQuery } from "../features/productsApi";
import { fetchProductsAsync } from "../features/productsSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  // const { data: allProducts, error, isLoading } = useGetAllProductsQuery();
  const { items: allProducts, status } = useSelector((state) => state.products);
  // console.log("query", allProducts);

  useEffect(() => {
    console.log("useEffect");
    dispatch(fetchProductsAsync());
  }, [dispatch]);
  // console.log("allProducts", allProducts);
  return (
    <>
      <h1>All Products</h1>
      <div>
        {status === "success" ? (
          <>
            {allProducts?.map((product) => {
              return (
                <div key={product._id}>
                  <Link to={`/products/${product.url}`}>
                    <h2>{product.name}</h2>
                    <img
                      src={product.image.url}
                      alt={product.name}
                      style={{ width: "300px" }}
                    />
                    <h3>{product.stock}</h3>
                  </Link>
                </div>
              );
            })}
          </>
        ) : status === "pending" ? (
          <p>Loading...</p>
        ) : (
          <p>Unexpected error occured...</p>
        )}
      </div>
    </>
  );
};

export default AllProducts;
