// Styles
import * as S from "./PostGetStyles";
// Interfaces
import { IPostGetProps, IComment } from "../../interfaces/IComponents/IPostGet";
// Components
import Loading from "../loading/Loading";
import ModalOpenPhoto from "../modalOpenPhoto/ModalOpenPhoto";
import LazyLoad from "react-lazyload";
import InputComment from "../inputComment/InputComment";
import ModalComments from "../modalComments/ModalComments";
// Hooks
import { useUser } from "../../customHooks/useUser";
import { MenuContext } from "../../contexts/useMenuSideBar";
import { useEffect, useState, useContext } from "react";
import useGetUserUid from "../../customHooks/useGetUserId";
import useGenerateRandomId from "../../customHooks/useGenerateRandomId";
// Firebase
import { db, auth } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const PostGet = ({
  userPosts,
  loading,
  handleLike,
  openDeleteModal,
}: IPostGetProps) => {
  const { user } = useUser();
  const { setShowMenu } = useContext(MenuContext);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [modalOpenComments, setModalOpenComments] = useState(false);

  useEffect(() => {
    try {
      const currentUser = auth.currentUser;
      const getUid = async () => {
        const userId = await useGetUserUid(currentUser?.email!);
        setCurrentUserId(userId!);
      };

      getUid();
    } catch {
      console.log("Algo de inesperado ocorreu");
    }
  }, [user]);

  // comentários
  const fetchComments = async (postId: string) => {
    try {
      const postRef = doc(db, "postagens", postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const postData = postSnapshot.data();
        const commentsData: IComment[] = postData?.comments || [];

        const commentsWithUserData: IComment[] = [];

        for (const comment of commentsData) {
          const userRef = doc(db, "users", comment.userId);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const commentWithUserData = {
              ...comment,
              displayName: userData?.displayName,
              avatar: userData?.avatar,
            };

            commentsWithUserData.push(commentWithUserData);
          }
        }

        setComments(commentsWithUserData);
      }
    } catch (error) {
      console.log("Erro ao buscar comentários:", error);
    }
  };

  const handleOpenModalComments = async (post: string) => {
    setComments([]);
    await fetchComments(post);
    setModalOpenComments((prev) => !prev);
  };

  const handleCloseModalComments = () => {
    setComments([]);
    setShowMenu(false);
    setModalOpenComments((prev) => !prev);
  };

  const handleProfilePictureClick = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <S.PostGetContainer>
      {userPosts.length > 0 ? (
        userPosts.map((post) => (
          <S.PostContainer key={post.id}>
            <LazyLoad offset={150}>
              <S.PostHeader>
                {post.avatar ? (
                  <S.PostProfilePic src={post.avatar} alt="Profile Pic" />
                ) : (
                  <S.PostProfileIcon>
                    <S.PostProfilePerson />
                  </S.PostProfileIcon>
                )}
                <S.PostHeaderData>
                  <S.PostName>{post.name}</S.PostName>
                  <S.PostData title="Publicado em">
                    {post.timestamp && post.timestamp.seconds && (
                      <>
                        {new Date(
                          post.timestamp.seconds * 1000
                        ).toLocaleDateString()}{" "}
                        às{" "}
                        {new Date(
                          post.timestamp.seconds * 1000
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </>
                    )}
                  </S.PostData>
                </S.PostHeaderData>
              </S.PostHeader>
              <S.PostContent>
                {post.content
                  .trim()
                  .split("\n")
                  .map((line, index) => (
                    <p key={index + useGenerateRandomId()}>{line}</p>
                  ))}
                {post.imageUrl && (
                  <S.PostImage
                    src={post.imageUrl}
                    alt="Imagem publicada"
                    title="Expandir"
                    onClick={() => handleProfilePictureClick(post.imageUrl!)}
                  />
                )}

                {selectedPhoto && (
                  <ModalOpenPhoto onClose={handleCloseModal}>
                    <S.ModalImage
                      src={selectedPhoto}
                      alt="Foto do post em tamanho grande"
                    />
                  </ModalOpenPhoto>
                )}
              </S.PostContent>

              <S.InteractiveButtons>
                <S.LikeButtonWrapper>
                  <S.LikeButton
                    title={
                      post.liked.includes(currentUserId!)
                        ? "Descurtir"
                        : "Curtir"
                    }
                    liked={
                      post.liked.includes(currentUserId!) ? "true" : "false"
                    }
                    onClick={() => handleLike(post.id)}
                  >
                    {post.liked.length > 0 && post.liked.length} <S.LikeIcon />
                    {post.liked.includes(currentUserId!) ? "Curtiu" : "Curtir"}
                  </S.LikeButton>
                </S.LikeButtonWrapper>

                <S.CommentButton
                  title={
                    post.comments && post.comments.length > 0
                      ? "Ver todos os comentários"
                      : "Seja o primeiro a comentar"
                  }
                  onClick={() => handleOpenModalComments(post.id)}
                >
                  {post.comments && (
                    <>
                      {post.comments.length > 0 && (
                        <S.CommentsCount>
                          {post.comments.length}
                        </S.CommentsCount>
                      )}
                    </>
                  )}
                  <S.CommentIcon />
                </S.CommentButton>

                {modalOpenComments && (
                  <ModalComments
                    post={post}
                    handleCloseModalComments={handleCloseModalComments}
                    comments={comments}
                  />
                )}

                <S.SpaceBetween>--</S.SpaceBetween>
              </S.InteractiveButtons>

              {openDeleteModal && (
                <S.DeleteButton
                  title="Excluir"
                  onClick={() => openDeleteModal(post.id)}
                >
                  <S.DeleteIcon />
                </S.DeleteButton>
              )}

              <InputComment postId={post.id} />
            </LazyLoad>
          </S.PostContainer>
        ))
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <S.EmptyMessage>Faça sua primeira postagem</S.EmptyMessage>
          )}
        </>
      )}
    </S.PostGetContainer>
  );
};

export default PostGet;
