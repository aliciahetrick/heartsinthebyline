import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, getTotals } from "../features/cartSlice";
import { fetchSingleProductAsync } from "../features/productsSlice";
import styled from "styled-components";

const SingleProduct = () => {
  const param = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [grade, setGrade] = useState("A");
  // const [price, setPrice] = useState(20);

  const handleChangeGrade = (event) => {
    setGrade(event.target.value);
  };

  console.log("grade:", grade);
  // console.log("price:", price);

  // useEffect(() => {
  //   setPrice("price" + grade);
  // }, [grade]);

  const { singleProduct, singleProductStatus } = useSelector(
    (state) => state.products
  );

  // console.log("param", param);
  useEffect(() => {
    dispatch(fetchSingleProductAsync(param));
  }, [dispatch, param]);

  // console.log("singleProduct", singleProduct);

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
          <ImageWrapper>
            {singleProduct.stock === 0 ||
            (singleProduct.stockA === 0 &&
              singleProduct.stockB === 0 &&
              singleProduct.stockC === 0) ? (
              <SoldOutBadge>SOLD OUT</SoldOutBadge>
            ) : null}
            <ProductImage
              src={singleProduct.image_url}
              alt={singleProduct.name}
              style={{ width: "300px" }}
            />
          </ImageWrapper>
          <ProductPrice>
            ${singleProduct.price || singleProduct[`price${grade}`]}
          </ProductPrice>
          {/* <p>{singleProduct.desc}</p> */}
          <div onChange={handleChangeGrade}>
            <GradeButton>
              <label>
                <input
                  type="radio"
                  // disabled={oneProduct.stock.gradeA === 0}
                  name="grade"
                  value="A"
                  disabled={!singleProduct.stockA ? true : false}
                />
                A Grade
              </label>
            </GradeButton>
            <GradeButton>
              <label>
                <input
                  type="radio"
                  // disabled={oneProduct.stock.gradeA === 0}
                  name="grade"
                  value="B"
                  disabled={!singleProduct.stockB ? true : false}
                />
                B Grade
              </label>
            </GradeButton>
            <GradeButton>
              <label>
                <input
                  type="radio"
                  // disabled={oneProduct.stock.gradeA === 0}
                  name="grade"
                  value="C"
                  disabled={!singleProduct.stockC ? true : false}
                />
                C Grade
              </label>
            </GradeButton>
          </div>
          {singleProduct.stock === 0 ||
          (singleProduct.stockA === 0 &&
            singleProduct.stockB === 0 &&
            singleProduct.stockC === 0) ? (
            <ProductButtonDisabled disabled>Sold Out </ProductButtonDisabled>
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  max-width: 300px;
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

const GradeButton = styled.div`
  &:active {
    color: white;
  }
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

const ProductButtonDisabled = styled.button`
  display: flex;
  width: 150px;
  height: 40px;
  background-color: #757475;
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
