import styled from "styled-components/macro";

const SoldOutBadge = () => {
  return (
    <>
      <SoldOut>SOLD OUT</SoldOut>
    </>
  );
};

export default SoldOutBadge;

const SoldOut = styled.div`
  color: #f578a6;
  font-family: "Raleway", sans-serif;
  position: absolute;
  background-color: white;
  padding: 5px 7px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 12px;
  max-width: 100px;
  margin-top: 10px;
  margin-left: 10px;
`;
