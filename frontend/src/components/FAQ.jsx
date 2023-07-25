import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <>
      <QuestionMark>?</QuestionMark>
      <Container>
        <Question>What's your grading policy?</Question>
        <Answer>
          <b>A grade pins</b> - Perfect or near perfect quality on the face of
          the pin. Small flaws may include light scratches on the metal plating
          or underfilling/scuffing on enamel colorfill.
        </Answer>
        <Answer>
          <b>B grade pins</b> - Pins with more noticeable minor flaws that
          include but are not limited to multiple areas of underfilled enamel,
          air bubbles or trapped dust in enamel, and moderately scratched enamel
          plating on the face of the pin.
        </Answer>
        <Answer>
          <b>C grade pins</b> - Pins in this category and grade are pins with
          marked bubbling in the metal plating and/or scratched screen printing.
        </Answer>
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
          All orders are shipped within 3-5 business days of order placement.
        </Answer>
        <Answer>
          All sticker only orders are shipped by stamped mail and expected to
          arrive 1-5 business days from shipment.
        </Answer>
        <Answer>
          All other orders are shipped via USPS Ground Advantage Mail which is
          expected to arrive within 1-5 days from shipment as well.
        </Answer>
        <Answer>
          Please keep a close watch on your tracking code as it will provide you
          with the expected delivery date. In the event that the delivery is
          unsuccessful and the item is returned to the sender, please note that
          an additional postage fee will be necessary for reshipment.
        </Answer>
        <Question>Help, I have a problem with my order! What do I do?</Question>
        <Answer>
          <ContactLink
            to="/contact"
            style={{ textDecoration: "none", color: "#f578a6" }}>
            Contact
          </ContactLink>{" "}
          us as soon as possible with a detailed explanation of what went wrong.
          Please include stripe reciept number with your inquiry.
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
  // margin-bottom: 2em;
  padding-bottom: 2em;
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

const ContactLink = styled(Link)`
  font-weight: bold;
`;
