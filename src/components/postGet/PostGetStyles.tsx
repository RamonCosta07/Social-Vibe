// Styled
import styled from "styled-components";
// Icons
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaThumbsUp, FaRegCommentAlt } from "react-icons/fa";
// Interface
import { ILikeButtonProps } from "../../interfaces/IComponents/IPostGet";

export const PostGetContainer = styled.div``;

export const PostContainer = styled.div`
  margin-bottom: 25px;
  padding: 10px;
  background-color: #ecee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
  width: 500px;

  @media screen and (max-width: 1200px) {
    width: 400px;
  }

  @media screen and (max-width: 992px) {
    width: 380px;
  }

  @media screen and (max-width: 600px) {
    width: 350px;
  }

  @media screen and (max-width: 500px) {
    width: 300px;
    margin-bottom: 27px;
  }

  @media screen and (max-width: 412px) {
    margin-bottom: 27px;
    &:last-of-type {
      @media screen and (max-width: 412px) {
        margin-bottom: 380px;
      }
    }
  }

  @media screen and (max-width: 360px) {
    margin-bottom: 27px;
    &:last-of-type {
      @media screen and (max-width: 360px) {
        margin-bottom: 220px;
      }
    }
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const PostProfilePic = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`;

export const PostProfileIcon = styled.div`
  margin-right: 1rem;
`;

export const PostHeaderData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostData = styled.div`
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 11.5px;
  cursor: default;
`;

export const PostProfilePerson = styled(BsFillPersonFill)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 0.1rem;
  background-color: #ceaace;
  margin-right: 10px;
`;

export const PostName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  cursor: default;
`;

export const PostContent = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap");
  margin-bottom: 1rem;
  margin-top: 0.8rem;
  max-height: 38em;

  p {
    font-family: "Cabin Sketch", cursive;
    font-size: 17px;
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

export const PostImage = styled.img`
  margin-top: 0.8rem;
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 5px;

  @media screen and (max-width: 992px) {
    max-height: 250px;
  }
`;

export const InteractiveButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LikeButtonWrapper = styled.div`
  flex-grow: 0;
  width: 75px;
`;

export const LikeButton = styled.button<ILikeButtonProps>`
  background-color: ${({ liked }) =>
    liked === "true" ? "#0E8EF2" : "#a19d9d"};
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  gap: 0.2rem;
  margin-bottom: 0.5rem;
  max-width: 120px;

  @media screen and (max-width: 1200px) {
    padding: 5px 8px;
  }

  @media screen and (max-width: 998px) {
    padding: 4.5px 5px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    margin-bottom: 0.7rem;
    padding: 5px 6px;
  }

  @media screen and (max-width: 400px) {
    padding: 4px 5px;
  }
`;

export const LikeIcon = styled(FaThumbsUp)`
  @media screen and (max-width: 1200px) {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 998px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.75rem;
  }
`;

export const CommentButton = styled.button`
  all: unset;
  cursor: pointer;
  position: relative;

  @media screen and (max-width: 600px) {
    margin-top: .6rem;
  }
`;

export const CommentsCount = styled.span`
  position: absolute;
  top: -5px;
  right: -6px;
  background-color: #1877f2;
  color: #fff;
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 50%;

  @media screen and (max-width: 998px) {
    font-size: 9px;
  }
`;

export const CommentIcon = styled(FaRegCommentAlt)`
  font-size: 1.4rem;
  color: #f50057;

  @media screen and (max-width: 998px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

export const SpaceBetween = styled.div`
  visibility: hidden;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    top: 30px;
  }
`;

export const DeleteIcon = styled(AiOutlineDelete)`
  font-size: 20px;
  color: #f50057;

  @media screen and (max-width: 768px) {
    font-size: 17px;
  }

  @media screen and (max-width: 500px) {
    font-size: 19px;
  }
`;

export const EmptyMessage = styled.p`
  font-size: 16px;
  color: #888;
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
`;
