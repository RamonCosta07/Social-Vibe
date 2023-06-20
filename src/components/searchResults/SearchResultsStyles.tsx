// Styled
import styled from "styled-components";
// Interface
import { ISearchResultsProps } from "../../interfaces/IStyles/ISearchResultsStyles";

export const SearchResults = styled.div<ISearchResultsProps>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: ${(props) => (props.loading === "true" ? "28px" : "10px")};

  .ProfileIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 10px;
    margin-right: 8px;
    color: black;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    align-items: center;
    padding: 4px;
    border: 1px solid cyan;

    cursor: default;

    &:hover {
      background-color: #f4f5f5;
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 8px;
      object-fit: cover;
    }

    .UserName {
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Número de linhas antes de adicionar ellipsis */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 180px;
    }
  }
`;

export const UsersSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #1877f2;
  transition: color 0.3s;
  margin-left: 1.2rem;

  &:hover {
    color: #0840a5;
  }

  svg {
    margin-right: 4px;
  }
`;

export const Friends = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  gap: 0.3rem;

  span {
    color: #00bfff;
    font-weight: bold;
  }
`;

export const RequestSend = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  gap: 0.3rem;

  span {
    color: #00bfff;
    font-weight: bold;
  }
`;

export const ContactPendent = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 11px;
  gap: 0.1rem;

  span {
    color: #00bfff;
    font-weight: bold;
  }
`;

export const UserName = styled.span`
  white-space: pre-wrap;
  word-break: break-word;
  flex-grow: 1;
  margin-right: 1rem;
`;
