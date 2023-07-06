import styled from "styled-components/macro";
// import { Link } from "react-router-dom";

const Home = () => {
  return (
    <PageContainer>
      {/* <h2>Home</h2> */}
      {/* <Link
        to={`/products`}
        style={{
          textDecoration: "none",
          color: "#f578a6",
          fontSize: "5em",
        }}>
        SHOP
      </Link> */}
      <ImageWrapper src="../../banner.jpeg" />
    </PageContainer>
  );
};

export default Home;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageWrapper = styled.img`
  object-fit: contain;
`;
