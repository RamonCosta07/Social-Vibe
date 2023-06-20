// Styles
import * as S from './InputCommentStyles';
// Hooks
import { useState } from "react";
import useGetUserUid from "../../customHooks/useGetUserId";
import { useUser } from "../../customHooks/useUser";
// Firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
// Icons
import { FaPaperPlane } from 'react-icons/fa';
// Interface
import { IInputCommentProps } from '../../interfaces/IComponents/IInputComment';

const InputComment = ({ postId }:IInputCommentProps) => {
    const [comment, setComment] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const { user } = useUser();
  
    const handleCommentSubmit = async () => {
      if (comment.trim() !== "") {
        setIsDisabled(true);
        const idPost = await useGetUserUid(user?.email!);
        const newComment = {
          comment: comment,
          userId: idPost,
          timestamp: new Date().getTime(),
        };
  
        const postRef = doc(db, "postagens", postId);
        const postSnapshot = await getDoc(postRef);
  
        if (postSnapshot.exists()) {
          const existingComments = postSnapshot.data().comments || [];
          const updatedComments = [...existingComments, newComment].sort(
            (a, b) => b.timestamp - a.timestamp
          );
  
          await updateDoc(postRef, {
            comments: updatedComments,
          });
        }
        setIsDisabled(false);
        setComment("");
      }
    };
  
    return (
      <S.CommentInputContainer>
        <S.CommentInputWrapper>
          <S.CommentInput
            type="text"
            placeholder="Digite um comentário"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommentSubmit();
              }
            }}
            disabled={isDisabled}
            maxLength={150}
          />
          <S.CommentSubmitButton
            onClick={handleCommentSubmit}
            disabled={isDisabled}
          >
            <FaPaperPlane />
          </S.CommentSubmitButton>
        </S.CommentInputWrapper>
      </S.CommentInputContainer>
    );
  };

export default InputComment;