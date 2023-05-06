import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useGetAllProductsQuery } from "../features/productsApi";
import { fetchProductsAsync } from "../features/productsSlice";
import styled from "styled-components";

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
      <WrapperTitle>All Products</WrapperTitle>
      <div>
        {status === "success" ? (
          <>
            {allProducts?.map((product) => {
              return (
                <ProductContainer key={product._id}>
                  <Link
                    to={`/products/${product.url}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ProductImage src={product.image.url} alt={product.name} />

                    <ProductName>{product.name}</ProductName>
                    {/* <h3>{product.stock}</h3> */}
                  </Link>
                </ProductContainer>
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

const WrapperTitle = styled.h1`
  color: #f578a6;
  text-align: center;
  font-size: 1.5rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const ProductContainer = styled.div`
  margin-bottom: 3em;
`;

const ProductImage = styled.img`
  width: 250px;
  border-radius: 1em;
`;

const ProductName = styled.h2`
  color: #f578a6;
  text-align: center;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 0.5em;
`;
