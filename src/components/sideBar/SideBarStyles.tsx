// Styled
import { styled } from "styled-components";
// Icons
import { BsPersonFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
// Interface
import { ISidebarWrapperProps } from "../../interfaces/IStyles/ISideBarStyles";

export const SidebarWrapper = styled.div<ISidebarWrapperProps>`
  position: fixed;
  left: 0;
  top: ${(props) => (props.avatar === "true" ? "75.9px" : "75.8px")};
  width: 175px;
  height: 100vh;
  background-color: #dee3ec;
  padding: 20px;
  z-index: 3;

  ul {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media screen and (max-width: 768px) {
      align-items: center;
      gap: 2rem;
    }
  }

  li {
    list-style: none;
    display: flex;
    gap: 0.5rem;
    cursor: pointer;
    transition: filter 0.3s ease;

    &:hover {
      filter: brightness(1.2);
      color: cyan;
      font-weight: bold;
      background-color: #1877f2;
      padding: 0.3rem;
      border-radius: 5px;
    }

    &.active {
      filter: brightness(1.2);
      color: cyan;
      font-weight: bold;
      background-color: #1877f2;
      padding: 0.3rem;
      border-radius: 5px;
    }

    &.profile-picture {
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        filter: none;
        color: inherit;
        font-weight: normal;
        background-color: transparent;
        padding: 0;
        border-radius: 0;
      }
    }

    @media screen and (max-width: 768px) {
      span {
        font-family: "Cabin Sketch", cursive;
        font-size: 15px;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    width: 17%;
  }

  @media screen and (max-width: 992px) {
    width: 20%;
  }

  @media screen and (max-width: 768px) {
    display: block;
    width: 100%;
    top: 132px;
    z-index: 999;
    position: fixed;
    left: -100%;
    animation: ${(props) =>
      props.showmenu === "true" ? "slideMenu 0.3s ease forwards" : "none"};
  }

  @keyframes slideMenu {
    from {
      left: -100%;
    }
    to {
      left: 0;
    }
  }

  @media screen and (max-width: 600px) {
    top: 130px;
  }
`;

export const MenuModalContainer = styled.div`
  position: relative;
`;

export const MenuModal = styled(AiOutlineMenu)`
  right: 400px;
  top: 10px;
  position: absolute;
  font-size: 1.5rem;
  display: none;

  @media screen and (max-width: 768px) {
    display: inline;
    font-size: 1.65rem;
    left: 100px;
    top: 30px;
  }

  @media screen and (max-width: 600px) {
    left: 50px;
    top: 35px;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
    left: 60px;
    top: 40px;
  }

  @media screen and (max-width: 380px) {
    left: 20px;
  }
`;

export const ProfilePictureContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

export const ProfilePictureIcon = styled(BsPersonFill)`
  height: 120px;
  width: 120px;
  cursor: default;

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  cursor: default;
  border-radius: 5px;

  @media screen and (max-width: 450px) {
    max-width: 80%;
    max-height: 80%;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;
