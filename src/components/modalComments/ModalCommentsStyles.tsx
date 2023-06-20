// Styled
import styled from "styled-components";
// Icons
import { AiFillCloseCircle } from "react-icons/ai";

export const ModalContainerComments = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalCard = styled.div`
  background-color: #f0f2f5;
  max-width: 500px;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
`;

export const ModalHeader = styled.div`
  background-color: #1877f2;
  color: #fff;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  border-radius: 5px;

  span {
    font-family: "Fredericka the Great", cursive;
    font-size: 19px;
    margin: 0;
    cursor: default;
  }
`;

export const CloseButton = styled.button`
  color: #fff;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
`;

export const CloseButtonIcon = styled(AiFillCloseCircle)`
  font-size: 1.4rem;
`;

export const ModalContent = styled.div`
  height: 60vh;
  overflow-y: auto;
`;

export const CommentContainer = styled.div`
  background-color: #eeceee;
  border-radius: 10px;
  margin-top: 0.7rem;
`;

export const CommentHeader = styled.div`
  display: flex;
  padding: 0.4rem;
`;

export const CommentContent = styled.div`
  margin-bottom: 0.3rem;
  max-height: 38em;
  p {
    font-family: "Cabin Sketch", cursive;
    font-size: 15px;
    color: #1877f2;
    font-weight: bold;
    text-align: left;
    margin-left: 1rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    line-height: 1.5em;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 30;

    @media screen and (max-width: 600px) {
      margin-left: 0;
    }

    @media screen and (max-width: 768px) {
      word-break: break-word;
    }
  }
`;

export const FirstComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 9rem;
  font-family: "Cabin Sketch", cursive;

  p {
    font-size: 20px;
  }
`;
