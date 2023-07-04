import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, getTotals } from "../../features/cartSlice";
import { fetchSingleProductAsync } from "../../features/productsSlice";
import styled from "styled-components";

import { BREAKPOINTS } from "../../constants/breakpoints";

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

  // console.log("grade:", grade);
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

  const handleAddToCart = (product, grade) => {
    dispatch(addToCart([product, grade]));
    navigate("/cart");
  };

  return (
    <>
      {singleProductStatus === "success" ? (
        <ProductWrapper>
          <DesktopLeftContainer>
            <ImageWrapperDesktop>
              {singleProduct.stock === 0 ||
              (singleProduct.stockA === 0 &&
                singleProduct.stockB === 0 &&
                singleProduct.stockC === 0) ? (
                <SoldOutBadge>SOLD OUT</SoldOutBadge>
              ) : null}
              <ProductImage
                src={singleProduct.image_url}
                alt={singleProduct.name}
                // style={{ width: "500px" }}
              />
            </ImageWrapperDesktop>
          </DesktopLeftContainer>
          <DesktopRightContainer>
            <ProductHeading>
              <ProductName>{singleProduct.name}</ProductName>
              <ProductSubtitle>{singleProduct.subtitle}</ProductSubtitle>
              <ImageWrapperMobile>
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
              </ImageWrapperMobile>
              <ProductPrice>
                ${singleProduct.price || singleProduct[`price${grade}`]}
              </ProductPrice>
            </ProductHeading>
            <ProductMiddle>
              <ProductDescription>
                {singleProduct.description}
              </ProductDescription>
            </ProductMiddle>
            <ProductGrades>
              {singleProduct.type === "pin" ? (
                <>
                  <p>
                    Grade / see <b>Grading Policy</b>:
                  </p>
                  <GradeButtonsContainer onChange={handleChangeGrade}>
                    <GradeButton>
                      <InputLabel>
                        <InputButton
                          type="radio"
                          // disabled={oneProduct.stock.gradeA === 0}
                          name="grade"
                          value="A"
                          disabled={!singleProduct.stockA ? true : false}
                        />
                        A
                      </InputLabel>
                    </GradeButton>
                    <GradeButton>
                      <InputLabel>
                        <InputButton
                          type="radio"
                          // disabled={oneProduct.stock.gradeA === 0}
                          name="grade"
                          value="B"
                          disabled={!singleProduct.stockB ? true : false}
                        />
                        B
                      </InputLabel>
                    </GradeButton>
                    <GradeButton>
                      <InputLabel>
                        <InputButton
                          type="radio"
                          // disabled={oneProduct.stock.gradeA === 0}
                          name="grade"
                          value="C"
                          disabled={!singleProduct.stockC ? true : false}
                        />
                        C
                      </InputLabel>
                    </GradeButton>
                  </GradeButtonsContainer>
                </>
              ) : null}
            </ProductGrades>
            <AddToCartButton>
              {singleProduct.stock === 0 ||
              (singleProduct.stockA === 0 &&
                singleProduct.stockB === 0 &&
                singleProduct.stockC === 0) ? (
                <ProductButtonDisabled disabled>
                  Sold Out{" "}
                </ProductButtonDisabled>
              ) : (
                <ProductButton
                  onClick={() => handleAddToCart(singleProduct, grade)}>
                  Add to Cart
                </ProductButton>
              )}
            </AddToCartButton>
          </DesktopRightContainer>
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
  @media only screen and (min-width: ${BREAKPOINTS.large}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15em;
    // border: 1px solid purple;
  }
`;

const DesktopLeftContainer = styled.div`
  // border: 3px solid red;
`;

const DesktopRightContainer = styled.div`
  // border: 5px solid purple;
  // margin: 0;
  min-width: 500px;
  min-height: 500px;
  background-color: #ffe4f1;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // gap: 3em;
`;

const ProductHeading = styled.div``;

const ProductMiddle = styled.div``;

const ProductGrades = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const AddToCartButton = styled.div``;

const ImageWrapperDesktop = styled.div`
  max-width: 300px;
  @media only screen and (max-width: ${BREAKPOINTS.large}) {
    display: none;
  }
`;

const ImageWrapperMobile = styled.div`
  max-width: 300px;
  @media only screen and (min-width: ${BREAKPOINTS.large}) {
    display: none;
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
  border-radius: 1em;
  width: 300px;
  // border: 2px solid green;
  @media only screen and (min-width: ${BREAKPOINTS.large}) {
    min-width: 500px;
    // border: 2px solid red;
  }
`;

const ProductName = styled.h2`
  color: #f578a6;
  text-align: center;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  // margin-top: 3em;
  @media only screen and (min-width: ${BREAKPOINTS.large}) {
    // border: 2px solid blue;
    font-size: 2.5em;
    // margin-bottom: -0.4em;
    // padding-top: 0.4em;
  }
`;

const ProductSubtitle = styled.p`
  color: #f578a6;
  font-size: 1rem;
  text-transform: uppercase;
  // margin-bottom: -0.4em;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 15px;
  @media only screen and (min-width: ${BREAKPOINTS.large}) {
  }
`;

const InputLabel = styled.label`
  color: #f578a6;
  font-size: 1.5rem;
  text-transform: uppercase;
  padding: 0.1em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  border: 2px solid #f578a6;
`;

const InputButton = styled.input`
  position: fixed;
  opacity: 0;
  pointer-events: none;

  color: #f578a6;
  &:focus {
    color: white;
  }
`;

const GradeButton = styled.div`
  &:active {
    color: white;
  }
`;

const GradeButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  // margin-bottom: -1em;
  color: #f578a6;
  text-align: center;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 20px;
`;

const ProductPrice = styled.p`
  color: #f578a6;
  text-align: center;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 20px;
  // margin-top: -0.1em;
`;

const ProductDescription = styled.div`
  white-space: pre-wrap;
  // margin-bottom: 0.5em;
  // text-align: left;
  // color: #f578a6;
  // text-align: center;
  // font-size: 1rem;
  // font-family: "Raleway", sans-serif;
  // text-transform: uppercase;
  // font-weight: 600;
`;

const ProductButton = styled.button`
  display: flex;
  width: 375px;
  height: 40px;
  background-color: #f578a6;
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin-top: 21px;
  margin-left: auto;
  margin-right: auto;
  /* margin-top: -30px; */

  font-family: "Raleway", sans-serif;
  border-radius: 10px;
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
  width: 400px;
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
  border-radius: 10px;
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  // &:hover {
  //   background-color: #fff5fa;
  // }
`;
