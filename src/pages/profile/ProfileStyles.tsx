import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";

export const ProfileContainer = styled.div`
  margin-top: 100px;

  @media screen and (max-width: 1200px) {
    margin-top: 110px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 145px;
  }

  @media screen and (max-width: 600px) {
    margin-top: 150px;
  }
`;

export const Excluding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    font-family: "Fredericka the Great", cursive;
    font-size: 24px;
    font-weight: bold;
  }
`;

export const ProfileDatas = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap");

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  cursor: default;

  @media screen and (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 1.2rem;
  }

  @media screen and (max-width: 600px) {
    gap: 0.3rem;
    margin-top: 1rem;
  }

  h2 {
    font-family: "Fredericka the Great", cursive;
  }
`;

export const NameEdit = styled.div`
  display: flex;
  gap: 1.2rem;

  p {
    cursor: default;
    font-family: "Fredericka the Great", cursive;
  }
`;

export const ChangePhotoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const ChangePhotoLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
`;

export const ChangePhotoButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;

  span {
    font-size: 14px;
    font-style: italic;
    color: black;
  }
`;

export const ChangePhotoInput = styled.input`
  display: none;
`;

export const DeletePhotoPerfil = styled.div`
  margin-top: 0.3rem;
  display: flex;
  gap: 0.2rem;
  cursor: pointer;

  span {
    font-size: 14px;
    font-style: italic;
    color: black;
  }
`;

export const DeletePhotoIcon = styled(AiOutlineDelete)`
  font-size: 17px;
`;

export const ButtonIcon = styled.button`
  cursor: pointer;
  border: none;
  display: flex;
  gap: 0.2rem;

  p {
    font-size: 10.3px;
    font-style: italic;
    color: black;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

export const DeleteAccount = styled.button`
  background-color: #f30d0d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  transition: font-size 0.3s;

  &:hover {
    background-color: darkred;
    font-weight: bold;
    transform: scale(1.2);
  }

  svg {
    margin-left: 5px;
  }
`;
