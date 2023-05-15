import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsAsync } from "../features/productsSlice";
import styled from "styled-components";
import { BREAKPOINTS } from "../constants/breakpoints";

const AllProducts = () => {
  const dispatch = useDispatch();

  const { items: allProducts, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);
  console.log("allProducts", allProducts);
  return (
    <>
      <WrapperTitle>All Products</WrapperTitle>
      <div>
        {status === "success" ? (
          <>
            <AllProductsContainer>
              {allProducts?.data.map((product) => {
                return (
                  <ProductContainer key={product.id}>
                    <Link
                      to={`/products/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                      />

                      <ProductName>{product.name}</ProductName>
                    </Link>
                  </ProductContainer>
                );
              })}
            </AllProductsContainer>
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

const AllProductsContainer = styled.div`
  @media only screen and (min-width: ${BREAKPOINTS.medium}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    flex-wrap: wrap;
    margin-left: 10%;
    margin-right: 10%;
  }
`;

const ProductContainer = styled.div`
  margin-bottom: 3em;
`;

const ProductImage = styled.img`
  width: 250px;
  border-radius: 1em;
  @media only screen and (min-width: ${BREAKPOINTS.medium}) {
    width: 300px;
  }
`;

const ProductName = styled.h2`
  color: #f578a6;
  text-align: center;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 0.5em;
  @media only screen and (min-width: ${BREAKPOINTS.medium}) {
    max-width: 300px;
  }
`;
