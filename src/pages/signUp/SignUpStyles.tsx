// Styled
import styled from "styled-components";
// Icons
import { TiArrowBackOutline } from "react-icons/ti";

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 20px;
`;

export const IconBack = styled(TiArrowBackOutline)`
  font-size: 4rem;
  transition: transform 0.3s ease-in-out;

  @media screen and (max-width: 998px) {
    font-size: 3.2rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 2.8rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 370px) {
    font-size: 2.5rem;
  }
`;

export const BackButton = styled.div`
  position: absolute;
  top: 90px;
  left: 90px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #0e7dec;
  font-size: 32px;

  @media screen and (max-width: 998px) {
    font-size: 27px;
  }

  @media screen and (max-width: 768px) {
    left: 15px;
    top: 90px;
  }

  @media screen and (max-width: 600px) {
    left: 15px;
    top: 25px;
    font-size: 25px;
  }

  @media screen and (max-width: 500px) {
    left: 10px;
    top: 15px;
    font-size: 20px;
  }

  @media screen and (max-width: 370px) {
    left: 10px;
    top: 30px;
  }

  p {
    font-weight: bold;
    font-style: italic;
    transition: transform 0.3s ease-in-out;

    @media screen and (max-width: 370px) {
      display: none;
    }
  }

  &:hover {
    p {
      transform: scale(1.2);
      margin-left: 0.5rem;
    }

    ${IconBack} {
      transform: scale(1.2);
    }
  }
`;

export const Form = styled.form`
  @import url("https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap");

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  background-color: #b0c4de;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: 20px;

  @media screen and (max-width: 1200px) {
    padding: 20px;
  }

  @media screen and (max-width: 500px) {
    margin-bottom: 20rem;
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const FormInput = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f2f5;

  &:focus {
    border-color: blue;
    outline: none;
    border-width: 2px;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const SubmitButton = styled.button`
  font-family: "Cabin Sketch", cursive;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #a5d0e0;
  font-size: 16px;
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #1877f2;
    color: white;
  }
`;

export const Title = styled.h1`
  font-family: "Fredericka the Great", cursive;
  cursor: default;
  text-align: center;
  color: #f50057;
`;

export const Subtitle = styled.h3`
  text-align: center;
  margin-top: 1rem;
  color: #555555;
  margin-bottom: 1rem;
`;
