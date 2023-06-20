import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

export const ModalContent = styled.div`
  background-color: #f0f2f5;
  padding: 24px;
  border-radius: 4px;
  width: 400px;

  p {
    text-align: center;
    font-style: italic;
    font-family: "Cabin Sketch", cursive;
    font-size: 18px;

    @media (max-width: 998px) {
      font-size: 16px;
    }

    @media (max-width: 600px) {
      font-size: 15px;
    }

    @media (max-width: 500px) {
      font-size: 14.5px;
    }
  }

  @media (max-width: 998px) {
    width: 380px;
  }

  @media (max-width: 600px) {
    width: 350px;
  }

  @media (max-width: 500px) {
    width: 330px;
  }

  @media (max-width: 420px) {
    width: 310px;
    padding: 22px;
    margin-bottom: 5rem;
  }
`;

export const ModalButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export const ConfirmButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? "#b4b0b0" : "#28a745")};
  color: #ffffff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const CancelButton = styled.button`
  background-color: #dc3545;
  color: #ffffff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
`;
