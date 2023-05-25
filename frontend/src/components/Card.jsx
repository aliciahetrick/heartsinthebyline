import { Link } from "react-router-dom";
import styled from "styled-components";
import { BREAKPOINTS } from "../constants/breakpoints";

const Card = (props) => {
  return (
    <ProductContainer key={props.id}>
      <Link to={`/products/${props.id}`} style={{ textDecoration: "none" }}>
        {props.stock === 0 ? <SoldOutBadge>SOLD OUT</SoldOutBadge> : null}
        <ProductImage src={props.image_url} alt={props.name} />
        <ProductName>{props.name}</ProductName>
      </Link>
    </ProductContainer>
  );
};

export default Card;

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
