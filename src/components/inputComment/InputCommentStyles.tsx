import styled from "styled-components";

export const CommentInputContainer = styled.div`
  margin-top: 0.7rem;
  display: flex;
  align-items: center;
`;

export const CommentInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f0f2f5;
  padding-right: 40px;

  &:focus {
    border-color: #1877f2;
    box-shadow: 0 0 0 1px #1877f2;
    outline: none;
  }

  &:disabled {
    background-color: #e2e0e0;
  }
`;

export const CommentSubmitButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #1877f2;
  font-size: 16px;

  &:hover {
    color: #0e60a6;
  }

  &:disabled {
    color: #ccc;
  }
`;
