import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotals } from "../features/cartSlice";
import { updateProductAsync } from "../features/productsSlice";
import { Stars } from "./Stars";
import styled from "styled-components/macro";
import { BREAKPOINTS } from "../constants/breakpoints";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  const { updateStockStatus } = useSelector((state) => state.products);

  const paidCart = JSON.parse(localStorage.getItem("cartItems"));

  const dispatch = useDispatch();

  console.log("paid cart", paidCart);

  useEffect(() => {
    dispatch(getTotals());

    paidCart?.map((paidItem) => {
      const updateObject = {
        url: paidItem.id,
        cartQty: paidItem.cartQty,
        type: paidItem.type,
        cartGrade: paidItem.cartGrade,
      };
      return dispatch(updateProductAsync(updateObject));
    });

    // make sure the clear cart runs after the update
    dispatch(clearCart());
  }, [dispatch, paidCart]);

  return (
    <>
      {updateStockStatus === "rejected" ? (
        <>
          <ErrorMessage>
            Oh no, some items sold out while you were checking out
          </ErrorMessage>
          <ErrorGIF src="../../throwing-chair.gif" />
          <ErrorMessageLink
            to={`/products`}
            style={{ textDecoration: "underline" }}>
            Back to products
          </ErrorMessageLink>
        </>
      ) : (
        <>
          <Stars amount={16} color={GOLD_COLOR} />
          <SuccessMessageContainer>
            <SuccessMessage>Checkout Successful!</SuccessMessage>
            <HappyGIF src="../../happy.gif" />
            <ItemsPurchasedTitle>You purchased: </ItemsPurchasedTitle>
            <PaidItemsContainer>
              {paidCart?.map((paidItem) => {
                return (
                  <PaidItem key={paidItem.id + paidItem.cartGrade}>
                    <PaidItemImage
                      src={paidItem.image_url}
                      alt={paidItem.name}
                      // style={{ width: "300px" }}
                    />

                    <PaidItemsDescriptionContainer>
                      <PaidItemDetail>{paidItem.name}</PaidItemDetail>
                      <PaidItemDetail>{paidItem.subtitle}</PaidItemDetail>
                      {paidItem.type === "pin" ? (
                        <PaidItemDetail>
                          Grade {paidItem.cartGrade}
                        </PaidItemDetail>
                      ) : null}
                    </PaidItemsDescriptionContainer>
                    <PaidItemDetail>x {paidItem.cartQty}</PaidItemDetail>
                  </PaidItem>
                );
              })}
            </PaidItemsContainer>
          </SuccessMessageContainer>
        </>
      )}
    </>
  );
};

export default CheckoutSuccess;

const GOLD_COLOR = "#ffd700";

// Error state

const ErrorMessage = styled.h2`
  text-align: center;
  color: #f578a6;
  font-family: Raleway;
  font-weight: 800;
  font-size: 20px;
  margin-top: 2em;
  text-transform: uppercase;
  margin-bottom: 1em;
`;

const ErrorGIF = styled.img`
  object-fit: cover;
  width: 200px;
  height: 200px;
  border-radius: 1.5em;
`;

const ErrorMessageLink = styled(Link)`
  text-align: center;
  color: #f578a6;
  font-family: Raleway;
  font-weight: 800;
  font-size: 20px;
  margin-top: 2em;
  text-transform: uppercase;
  margin-bottom: 1em;
`;

// Successful Checkout Message and GIF

const SuccessMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  // margin-top: 6em;
  align-items: center;
`;

const SuccessMessage = styled.h2`
  text-align: center;
  color: #f578a6;
  font-family: Raleway;
  font-weight: 800;
  font-size: 20px;
  margin-top: 2em;
  text-transform: uppercase;
  margin-bottom: 1em;
`;

const HappyGIF = styled.img`
  object-fit: cover;
  width: 200px;
  height: 200px;
  border-radius: 1.5em;
`;

// List of purchased items

const ItemsPurchasedTitle = styled.h2`
  text-align: center;
  color: #f578a6;
  font-family: Raleway;
  font-weight: 800;
  font-size: 20px;
  margin-top: 2em;
  text-transform: uppercase;
  width: 50%;
  // border: 1px solid red;
  padding-bottom: 1em;
  border-bottom: 2px solid pink;
  @media only screen and (max-width: ${BREAKPOINTS.medium}) {
    width: 90%;
  }
`;

const PaidItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 2em;
`;

const PaidItem = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  padding-top: 1em;
  padding-bottom: 1em;

  ::after {
    content: "";
    position: absolute;
    margin: auto;
    margin-top: 8em;
    width: 50%;
    height: 2px;
    background-color: pink;
    @media only screen and (max-width: ${BREAKPOINTS.medium}) {
      width: 90%;
    }
  }

  @media only screen and (max-width: ${BREAKPOINTS.medium}) {
    width: 90%;
  }
`;

const PaidItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 1em;
`;

const PaidItemsDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1em;
`;

const PaidItemDetail = styled.h2`
  color: #f578a6;
  text-align: left;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  margin-top: 0.5em;
  // border: 1px solid blue;
`;
