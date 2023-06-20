// Styled
import styled from "styled-components";
// Icons
import { FaRegSadCry } from "react-icons/fa";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media screen and (max-width: 768px) {
    padding: 16px;
  }
`;

export const NotFoundHeading = styled.h1`
  font-size: 48px;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
`;

export const NotFoundText = styled.p`
  font-size: 24px;
  margin-bottom: 32px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Icon = styled(FaRegSadCry)`
  font-size: 64px;
  margin-bottom: 62px;

  @media screen and (max-width: 768px) {
    font-size: 48px;
  }
`;
