// Styled
import styled from "styled-components";
// Icons
import { FaCheck, FaTimes } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";

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
  background-color: #dee1e4;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;

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
  background-color: #f0f2f5;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const ContactPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const ProfileImage = styled(BsFillPersonFill)`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  border-radius: 50%;
  vertical-align: middle;
`;

export const ContactName = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

export const ConfirmButton = styled.button`
  background-color: #3de23d;
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

export const NoRequestWarning = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap');
  display: flex;
  align-items: center;
  padding: 3px;
  background-color: #f0f2f5;
  border-radius: 4px;
  margin-bottom: 8px;
  text-align: center;
  font-family: 'Cabin Sketch', cursive;
  font-size: 14px;
`;
