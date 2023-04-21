import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../features/productsApi";

const AllProducts = () => {
  const { data: allProducts, error, isLoading } = useGetAllProductsQuery();
  // console.log("query", allProducts);
  return (
    <>
      <h1>All Products</h1>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>An error occured</p>
        ) : (
          <>
            {allProducts?.map((product) => {
              return (
                <div key={product.id}>
                  <Link to={`/products/${product.name}`}>
                    <h2>{product.name}</h2>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "300px" }}
                    />
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default AllProducts;
