// Styles
import * as S from "./ModalCommentsStyles";
import {
  PostData,
  PostHeaderData,
  PostName,
  PostProfileIcon,
  PostProfilePerson,
  PostProfilePic,
} from "../postGet/PostGetStyles";
// Interfaces
import { IModalCommentsProps } from "../../interfaces/IComponents/IModalComments";
// Hooks
import useGenerateRandomId from "../../customHooks/useGenerateRandomId";

const ModalComments = ({
  post,
  handleCloseModalComments,
  comments,
}: IModalCommentsProps) => {
  return (
    <S.ModalContainerComments>
      <S.ModalCard>
        <S.ModalHeader>
          <span>Publicação de {post.name}</span>
          <S.CloseButton
            title="Fechar comentários"
            onClick={handleCloseModalComments}
          >
            <S.CloseButtonIcon />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalContent>
          {comments.length > 0 ? (
            <>
              {comments.map((comment, index) => (
                <S.CommentContainer
                  key={useGenerateRandomId() + comment.id + index}
                >
                  <S.CommentHeader>
                    {comment.avatar ? (
                      <PostProfilePic src={comment.avatar} alt="Profile Pic" />
                    ) : (
                      <PostProfileIcon>
                        <PostProfilePerson />
                      </PostProfileIcon>
                    )}
                    <PostHeaderData>
                      <PostName>{comment.displayName}</PostName>
                      <PostData title="Publicado em">
                        {comment.timestamp && (
                          <>
                            {new Date(comment.timestamp).toLocaleString([], {
                              dateStyle: "short",
                              timeStyle: "short",
                            })}
                          </>
                        )}
                      </PostData>
                    </PostHeaderData>
                  </S.CommentHeader>

                  <S.CommentContent>
                    <p>{comment.comment}</p>
                  </S.CommentContent>
                </S.CommentContainer>
              ))}
            </>
          ) : (
            <S.FirstComment>
              <p>Faça o primeiro comentário</p>
            </S.FirstComment>
          )}
        </S.ModalContent>
      </S.ModalCard>
    </S.ModalContainerComments>
  );
};

export default ModalComments;
