import styled from "styled-components/macro";

const Home = () => {
  return (
    <PageContainer>
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
