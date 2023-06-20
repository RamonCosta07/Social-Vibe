// Styled
import styled from "styled-components";
// Interface
import { ButtonProps } from "../interfaces/IStyles/IButton";

export const Button = styled.button<ButtonProps>`
  padding: 15px 20px;
  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: ${(props) => props.width};
  font-size: 20px;

  &:hover {
    background-color: ${(props) => props.hoverbackgroundcolor};
    font-weight: bold;
  }

  @media (max-width: 500px) {
    max-width: 180px;
  }
`;
