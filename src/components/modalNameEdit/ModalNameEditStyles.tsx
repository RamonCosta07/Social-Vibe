import styled, { css } from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

export const ModalContent = styled.div`
  background-color: #f0f2f5;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 280px;
  }

  @media screen and (max-width: 420px) {
    width: 260px;
    height: 250px;
    margin-bottom: 12rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  p {
    display: flex;
    gap: 0.5rem;
  }
`;

export const AlertMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 1rem;

  &:focus {
    border-color: blue;
    outline: none;
    border-width: 2px;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ConfirmButton = styled.button`
  background-color: green;
  color: white;
  padding: 8px 16px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: lightgray;
      cursor: not-allowed;
    `}
`;

export const CancelButton = styled.button`
  background-color: #f30d0d;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;
