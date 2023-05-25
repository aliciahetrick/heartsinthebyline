import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../features/productsSlice";
import styled from "styled-components";
import { BREAKPOINTS } from "../constants/breakpoints";
import Card from "./Card";

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
                  <Card
                    key={product.id}
                    id={product.id}
                    stock={product.stock}
                    image_url={product.image_url}
                    name={product.name}
                  />
                );
              })}
            </AllProductsContainer>
          </>
        ) : allProducts.status === "pending" ? (
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
