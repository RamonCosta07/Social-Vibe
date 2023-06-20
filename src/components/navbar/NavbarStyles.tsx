// Styled
import styled from "styled-components";
// Icons
import { FaCheck, FaSearch, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1877f2;
  padding: 16px;
  z-index: 3;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 16px 8px;
    justify-content: center;
    gap: 0.5rem;
  }

 
`;

export const Logo = styled.img`
  width: 40px;
  height: auto;

  @media screen and (max-width: 768px){
    position: absolute;
    top: 20px;
    right: 15px;
    width: 35px;
  }
`;

export const SearchRelative = styled.div`
  position: relative;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f2f5;
  border-radius: 4px;
  padding: 8px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 8px;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 4px;
  background-color: #f0f2f5;
  width: 200px;
`;

export const SearchIcon = styled(FaSearch)`
  margin-right: 8px;
`;

export const MenuBottons = styled.div`
  display: flex;
  position: relative;

  @media screen and (max-width: 768px) {
    gap: 1rem;
  }

  @media screen and (max-width: 600px) {
    gap: .9rem;
  }
`;

export const MenuModal = styled(AiOutlineMenu)`
  right: 400px;
  top: 10px;
  position: absolute;
  font-size: 1.5rem;
  display: none;

  @media screen and (max-width: 768px) {
    display: inline;
  }

  @media screen and (max-width: 600px) {
    top: 10px;
  }

  @media screen and (max-width: 600px) {
    right: 185px;
    top: 10px;
  }
`;

export const NotificationIcon = styled(IoMdNotificationsOutline)`
  margin-right: 8px;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
`;

export const NotificationWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const NotificationCount = styled.span`
  position: absolute;
  top: 8px;
  right: 3px;
  background-color: red;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 4px 6px;
  border-radius: 50%;
  cursor: default;
`;

export const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 120%;
  left: -70px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 4;

  & > h4 {
    text-align: center;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
`;

export const NotificationItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const ContactPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const ContactName = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

export const ConfirmButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px;
  margin-left: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DeclineButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px;
  margin-left: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfirmIcon = styled(FaCheck)`
  margin-right: 4px;
`;

export const DeclineIcon = styled(FaTimes)`
  margin-right: 4px;
`;

export const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 100px;

  @media screen and (min-width: 768px) {
    &:hover {
      font-size: 1.1rem;
      font-weight: bold;
    }
  }

  @media screen and (max-width: 768px) {
    width: auto;
    padding: 0 8px;
  }
`;

export const LogoutIcon = styled(FaSignOutAlt)`
  margin-right: 8px;
`;

export const PerfilButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: default;
  width: 100px;
  font-size: 1.2rem;

  @media screen and (max-width: 768px) {
    width: auto;
    padding: 0 8px;
  }
`;

export const PerfilIcon = styled(BsFillPersonFill)`
  margin-right: 8px;
  margin-top: 1rem;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  cursor: pointer;
  object-fit: cover;
`;
