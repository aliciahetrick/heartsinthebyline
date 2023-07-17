import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components/macro";
import { BREAKPOINTS } from "../constants/breakpoints";

export const Contact = () => {
  const form = useRef();
  const [successfulSubmit, isSuccessfulSubmit] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `${process.env.REACT_APP_EMAILJS_SERVICE_ID}`,
        `${process.env.REACT_APP_EMAILJS_TEMPLATE_ID}`,
        form.current,
        // "YOUR_PUBLIC_KEY"
        `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Message sent");
          e.target.reset();
          isSuccessfulSubmit(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Form ref={form} onSubmit={sendEmail}>
      <FormSection>
        <FormLabel>Name</FormLabel>
        <FormTextInput type="text" name="user_name" required />
      </FormSection>
      <FormSection>
        <FormLabel>Email</FormLabel>
        <FormTextInput type="email" name="user_email" required />
      </FormSection>
      <FormSection>
        <FormLabel>Message</FormLabel>
        <FormTextAreaInput name="message" required />
      </FormSection>
      {successfulSubmit ? (
        <FormSection>
          <SuccessfulSubmitMessage>
            Email successfully sent
          </SuccessfulSubmitMessage>
          <SuccessfulSubmitMessage>
            We will get back to you shortly
          </SuccessfulSubmitMessage>
        </FormSection>
      ) : null}
      <FormSection>
        <FormSubmit type="submit" value="Send" />
      </FormSection>
    </Form>
  );
};

export default Contact;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  //   width: 80%;
  //   border: 1px solid red;
  //   margin: 0 auto;
  padding-top: 1em;
  margin-left: 10%;
  margin-right: 10%;

  @media only screen and (min-width: ${BREAKPOINTS.medium}) {
    margin-left: 20%;
    margin-right: 20%;
  }

  @media only screen and (min-width: ${BREAKPOINTS.large}) {
    margin-left: 30%;
    margin-right: 30%;
  }
`;

const FormSection = styled.div`
  //   border: 1px solid green;
  width: 100%;
  margin-bottom: 1em;
`;

const FormLabel = styled.label`
  display: inline-block;
  color: #f578a6;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
  padding-bottom: 0.5em;
`;

const FormTextInput = styled.input`
  width: 100%;
`;

const FormTextAreaInput = styled.textarea`
  width: 100%;
  height: 10em;
`;

const SuccessfulSubmitMessage = styled.p`
  color: #f578a6;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
`;

const FormSubmit = styled.input`
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #f578a6;
  color: white;
  font-size: 15px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  border-radius: 10px;
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  //   border: 1px solid red;
`;
