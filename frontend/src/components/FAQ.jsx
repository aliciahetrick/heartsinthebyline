import styled from "styled-components";

const FAQ = () => {
  return (
    <>
      <QuestionMark>?</QuestionMark>
      <Container>
        <Question>Do you ship internationally?</Question>
        <Answer>
          Unfortunately, I currently only ship to United States addresses.
        </Answer>
        <Question>What's your cancellation/refund policy? </Question>
        <Answer>
          At this time, cancellations and refunds are not accepted.
        </Answer>
        <Question>How long will it take for my item to arrive?</Question>
        <Answer>
          My goal is to ensure that all orders are shipped within 3-5 business
          days.
        </Answer>
        <Answer>
          All sticker only orders are shipped by stamped mail and expected to
          arrive 1-5 business days from shipment.
        </Answer>
        <Answer>
          All other orders are shipped via USPS First-Class Mail which is
          expected to arrive within 1-5 days from shipment as well.
        </Answer>
        <Answer>
          Please keep a close watch on your tracking code as it will provide you
          with the expected delivery date. In the event that the delivery is
          unsuccessful and the item is returned to the sender, please note that
          an additional postage fee will be necessary for reshipping.
        </Answer>

        <Question>Help, I have a problem with my order! What do I do?</Question>
        <Answer>
          Email us at <b>shop.heartsinthebyline@gmail.com</b> as soon as
          possible with a detailed explaination of what went wrong. Please
          include stripe reciept number with your inquiry.
        </Answer>
      </Container>

      {/* <Question>Do you accept ____ currency?</Question> */}
    </>
  );
};

export default FAQ;

const QuestionMark = styled.p`
  color: pink;
  font-size: 5rem;
  font-weight: 800;
  //   border: 1px solid red;
  margin-top: 0;
  margin-bottom: 0;
`;

const Container = styled.div`
  //   border: 1px solid red;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: 1em;
  margin-bottom: 2em;
`;

const Question = styled.div`
  color: #f578a6;
  text-align: center;
  font-size: 1.5rem;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-weight: 900;
`;

const Answer = styled.div`
  color: #f578a6;
  text-align: center;
  font-size: 1rem;
  font-family: "Raleway", sans-serif;
  //   text-transform: uppercase;
  //   margin-top: 0.5em;
  font-weight: 500;
`;
