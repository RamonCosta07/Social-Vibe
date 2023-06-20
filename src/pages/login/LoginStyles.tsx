import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  @media screen and (max-width: 1200px) {
    padding: 2rem;
  }

  @media screen and (max-width: 998px) {
    padding: 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  @media screen and (max-width: 600px) {
    padding: 0.5rem;
  }

  @media screen and (max-width: 375px) {
    padding: 1rem;
  }
`;

export const Greeting = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap");

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;

  h1 {
    font-family: "Fredericka the Great", cursive;
    font-size: 52px;
    margin-bottom: 1.5rem;
    color: #1877f2;
    cursor: default;
  }

  p {
    font-size: 32px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;

    h1 {
      font-size: 30px;
      margin-top: 8rem;
    }

    p {
      display: none;
    }
  }

  @media screen and (max-width: 412px) {
    width: 100%;
    h1 {
      margin-top: -4rem;
    }

    p {
      display: none;
    }
  }

  @media screen and (max-width: 375px) {
    width: 90%;
    h1 {
      font-size: 32px;
      margin-top: 0.5rem;
    }
  }
`;

export const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  @media screen and (max-width: 988px) {
    margin-top: 2rem;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }

  @media screen and (max-width: 375px) {
    margin-bottom: 130px;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px;
  background-color: #b0c4de;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 500px) {
    padding: 40px;
    max-width: 300px;
  }

  @media (max-width: 375px) {
    padding: 30px;
    max-width: 250px;
  }
`;

export const LoginInput = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 350px;
  background-color: #f0f2f5;

  &:focus {
    border-color: blue;
    outline: none;
    border-width: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;

    &:focus {
      border-width: 1px;
    }
  }
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const SignUpContainer = styled.div`
  border-top: 3px solid #7e7a7a;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SignUp = styled.div`
  margin-top: 1rem;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

export const SignInGoogle = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-family: "Cabin Sketch", cursive;
    font-style: italic;
    border-bottom: 3px solid #7e7a7a;
    font-size: 18px;
    text-align: center;
    margin-top: 1rem;
    padding-bottom: 1rem;
  }

  p:nth-of-type(2) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    p:first-of-type {
      display: none;
    }

    p:nth-of-type(2) {
      display: block;
    }
  }
`;

export const SignInGoogleButton = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap");

  padding: 20px 40px;
  border: none;
  border-radius: 20px;
  background-color: #a5d0e0;
  font-size: 16px;
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  span {
    font-family: "Cabin Sketch", cursive;
    color: #2c2c2c;
    margin-left: 0.3rem;
  }

  &:hover {
    background-color: #f50057;
    color: white;
    span {
      color: white;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 412px) {
    margin-bottom: 10rem;
  }

  @media (max-width: 375px) {
    margin-bottom: 4rem;
  }
`;
