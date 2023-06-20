import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  width: 350px;
  padding: 12px;
  border-radius: 8px;
  background-color: #e7e9eb;
  resize: none;
  font-size: 16px;

  &:focus {
    border-color: #1877f2;
    box-shadow: 0 0 0 1px #1877f2;
    outline: none;
  }
`;

export const PostButton = styled.button`
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 2rem;

  &:disabled {
    background-color: #999898;
    cursor: not-allowed;
  }
`;

export const CharacterCount = styled.span`
  position: absolute;
  bottom: 6px;
  right: 12px;
  font-size: 12px;
  color: #1a1919;
  cursor: default;
`;

export const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const UploadInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: -1rem;
`;

export const UploadInputLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #a7e2e0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }

  font-style: italic;
`;

export const UploadInput = styled.input`
  display: none;
`;
