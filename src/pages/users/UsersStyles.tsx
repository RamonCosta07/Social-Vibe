import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";

export const UsersContainer = styled.div`
  margin-top: 8rem;
  margin-left: 5rem;

  @media screen and (max-width: 1200px) {
    margin-left: 10rem;
  }

  @media screen and (max-width: 998px) {
    margin-top: 8rem;
    margin-left: 7rem;
  }

  @media screen and (max-width: 768px) {
    margin-top: 10.5rem;
    margin-left: 1rem;
  }

  @media screen and (max-width: 600px) {
    margin-top: 9.5rem;
    margin-left: 0rem;
  }

  @media screen and (max-width: 500px) {
    margin-top: 9.5rem;
  }
`;

export const HeaderUsers = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap");

  display: flex;
  gap: 0.7rem;
  margin-left: 23rem;

  h1 {
    font-family: "Fredericka the Great", cursive;
    cursor: default;
  }

  @media screen and (max-width: 1200px) {
    margin-left: 18rem;
  }

  @media screen and (max-width: 998px) {
    margin-left: 14rem;
    font-size: 15px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 10rem;
    font-size: 14px;
    gap: 0.4rem;
  }

  @media screen and (max-width: 600px) {
    margin-left: 7rem;
    font-size: 12px;
  }

  @media screen and (max-width: 500px) {
    margin-left: 3.5rem;
    font-size: 11px;
  }

  @media screen and (max-width: 400px) {
    margin-left: 0.8rem;
    font-size: 9.5px;
    margin-bottom: 0.5rem;
  }
`;

export const AlertUsers = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap");
  margin-left: 26rem;

  p {
    font-family: "Cabin Sketch", cursive;
    color: #2c2c2c;
    font-size: 18px;
    margin-bottom: 2rem;

    @media screen and (max-width: 400px) {
      font-size: 16px;
      text-align: center;
    }
  }

  @media screen and (max-width: 1200px) {
    margin-left: 20rem;
  }

  @media screen and (max-width: 998px) {
    margin-left: 15rem;
  }

  @media screen and (max-width: 768px) {
    margin-left: 11rem;
  }

  @media screen and (max-width: 600px) {
    margin-left: 6rem;
  }

  @media screen and (max-width: 500px) {
    margin-left: 2rem;
  }

  @media screen and (max-width: 400px) {
    margin-left: 0rem;
  }
`;

export const IconSearchUsers = styled(BiSearchAlt)`
  color: #2b7a7a;
  font-size: 1.8rem;
  margin-top: 0.5rem;

  @media screen and (max-width: 400px) {
    font-size: 1.5rem;
    margin-top: 0.1rem;
  }
`;

export const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;

  @media screen and (max-width: 998px) {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 600px) {
    width: 60px;
    height: 60px;
  }
`;

export const UserIcon = styled(BsPersonCircle)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;

  @media screen and (max-width: 998px) {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 600px) {
    width: 60px;
    height: 60px;
  }
`;

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-left: 1rem;

  @media screen and (max-width: 998px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const UserContainer = styled.li`
  margin-left: 10rem;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 1rem;

  @media screen and (max-width: 1200px) {
    margin-left: 6rem;
  }

  @media screen and (max-width: 998px) {
    margin-left: 3rem;
  }

  @media screen and (max-width: 768px) {
    margin-left: 1rem;
  }

  @media screen and (max-width: 600px) {
    margin-left: 0.1rem;
  }

  @media screen and (max-width: 500px) {
    margin-left: 0.5rem;
  }
`;

export const DisplayName = styled.div`
  color: rgb(24, 119, 242);
  font-weight: bold;
  font-size: 18px;
  cursor: default;

  @media screen and (max-width: 998px) {
    font-size: 17px;
  }

  @media screen and (max-width: 600px) {
    font-size: 15px;
  }

  @media screen and (max-width: 500px) {
    font-size: 16.5px;
  }
`;
