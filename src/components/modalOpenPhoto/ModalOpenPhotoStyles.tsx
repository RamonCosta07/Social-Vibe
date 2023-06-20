import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  max-width: 80%;
  max-height: 95%;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (max-width: 1200px) {
    max-width: 90%;
  }

  @media screen and (max-width: 992px) {
    max-width: 95%;
  }

  @media screen and (max-width: 768px) {
    max-width: 98%;
  }

  @media screen and (max-width: 600px) {
    max-width: 100%;
  }

  @media screen and (max-width: 500px) {
    max-height: 80%;
  }

  /* Estilos para a foto */
  img {
    width: 100%;

    @media screen and (max-width: 1200px) {
      height: 100vh;
    }

    @media screen and (max-width: 600px) {
      width: 80%;
      margin-left: 4rem;
    }

    @media screen and (max-width: 500px) {
      width: 90%;
      margin-left: 1rem;
    }
  }
`;
