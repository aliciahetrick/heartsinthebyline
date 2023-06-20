import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../../features/productsSlice";
import styled from "styled-components";
import { BREAKPOINTS } from "../../constants/breakpoints";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const allProducts = useSelector((state) => state.products);

  console.log("allProducts", allProducts);

  return (
    <>
      <WrapperTitle>All Products</WrapperTitle>
      <div>
        {allProducts.status === "success" ? (
          <>
            <AllProductsContainer>
              {allProducts?.items.map((product) => {
                return (
                  <ProductContainer key={product.id}>
                    <Link
                      to={`/products/${product.id}`}
                      style={{ textDecoration: "none" }}>
                      {product.stock === 0 ||
                      (product.stockA === 0 &&
                        product.stockB === 0 &&
                        product.stockC === 0) ? (
                        <SoldOutBadge>SOLD OUT</SoldOutBadge>
                      ) : null}
                      <ProductImage
                        src={product.image_url}
                        alt={product.name}
                      />
                      <ProductName>{product.name}</ProductName>
                    </Link>
                  </ProductContainer>
                );
              })}
            </AllProductsContainer>
          </>
        ) : allProducts.status === "pending" ? (
          <>
            <LoaderContainer>
              <ErrorText>Loading...</ErrorText>
              <CSSLoader></CSSLoader>
            </LoaderContainer>
          </>
        ) : (
          <ErrorText>Unexpected error occured...</ErrorText>
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  @media only screen and (max-width: ${BREAKPOINTS.medium}) {
    max-width: 250px;
  }
`;

const SoldOutBadge = styled.div`
  color: #f578a6;
  font-family: "Raleway", sans-serif;
  position: absolute;
  background-color: white;
  padding: 5px 7px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 12px;
  max-width: 70px;
  margin-top: 10px;
  margin-left: 10px;
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

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.h4`
  color: #f578a6;
  text-align: center;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const CSSLoader = styled.div`
  border: 10px solid pink;
  border-top: 10px solid #f578a6;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
