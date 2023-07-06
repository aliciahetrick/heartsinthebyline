import styled from "styled-components/macro";

const NotFound = () => {
  return (
    <Wrapper>
      <Status>404</Status>
      <ImageWrapper src="../../throwing-chair.gif" />
      <Title>Page Not Found</Title>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6em;
  align-items: center;
`;

const Status = styled.h2`
  text-align: center;
  color: #f578a6;
  font-family: Raleway;
  font-weight: 800;
  font-size: 50px;
  text-transform: uppercase;
`;

const ImageWrapper = styled.img`
  object-fit: cover;
  width: 200px;
  height: 200px;
  border-radius: 1.5em;
`;

const Title = styled.h2`
  text-align: center;
  color: #f578a6;
  font-family: Raleway;
  font-weight: 800;
  font-size: 20px;
  margin-top: 2em;
  text-transform: uppercase;
`;
