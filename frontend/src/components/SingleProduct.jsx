import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, getTotals } from "../features/cartSlice";
// import { useGetSingleProductQuery } from "../features/productsApi";
import { fetchSingleProductAsync } from "../features/productsSlice";
import styled from "styled-components";

const SingleProduct = () => {
  const param = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { singleProduct, singleProductStatus } = useSelector(
    (state) => state.products
  );

  console.log("param", param);
  useEffect(() => {
    dispatch(fetchSingleProductAsync(param));
  }, [dispatch, param]);

  console.log("singleProduct", singleProduct);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <>
      {singleProductStatus === "success" ? (
        <ProductWrapper>
          <ProductName>{singleProduct.name}</ProductName>
          <ProductImage
            src={singleProduct.images[0]}
            alt={singleProduct.name}
            style={{ width: "300px" }}
          />
          <ProductPrice>${singleProduct.price.unit_amount / 100}</ProductPrice>
          {/* <p>{singleProduct.desc}</p> */}

          {singleProduct.stock === 0 ? (
            <button disabled>Sold Out </button>
          ) : (
            <ProductButton onClick={() => handleAddToCart(singleProduct)}>
              Add to Cart
            </ProductButton>
          )}
        </ProductWrapper>
      ) : singleProductStatus === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </>
  );
};

export default SingleProduct;

const ProductWrapper = styled.div`
  transform: translateY(20%);
`;

const ProductImage = styled.img`
  border-radius: 1em;
`;

const ProductName = styled.h2`
  color: #f578a6;
  text-align: center;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  // margin-top: 3em;
`;

const ProductPrice = styled.p`
  color: #f578a6;
  text-align: center;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-weight: 600;
`;

const ProductButton = styled.button`
  display: flex;
  width: 150px;
  height: 40px;
  background-color: #f578a6;
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  /* margin-top: -30px; */
  font-family: "Raleway", sans-serif;
  border-radius: 20px;
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  // &:hover {
  //   background-color: #fff5fa;
  // }
`;
