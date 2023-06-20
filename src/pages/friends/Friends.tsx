// Styles
import * as S from "./FriendsStyles";
// Hooks e Context
import { useContext, useEffect, useState } from "react";
import { useUser } from "../../customHooks/useUser";
import { MenuContext } from "../../contexts/useMenuSideBar";
import useGetUserUid from "../../customHooks/useGetUserId";
// React Router Dom
import { Outlet } from "react-router-dom";
// Firebase
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
// Components
import Loading from "../../components/loading/Loading";
import PostGet from "../../components/postGet/PostGet";
// Interfaces
import { IPostGet } from "../../interfaces/IComponents/IPostGet";

const Friends = () => {
  const [friendPosts, setFriendPosts] = useState<IPostGet[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { setShowMenu } = useContext(MenuContext);

  const fetchFriendsPosts = async () => {
    try {
      if (user) {
        const userUid = await useGetUserUid(user.email!);
        const userDoc = doc(db, "users", userUid!);
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.data();

        if (userData) {
          const friends = userData.friends || [];
          const friendPostsPromises = friends.map(async (friendId: string) => {
            if (friendId) {
              const friendPostsCollection = collection(db, "postagens");
              const friendPostsQuery = query(
                friendPostsCollection,
                where("userId", "==", friendId),
                orderBy("timestamp", "desc")
              );
              const friendPostsSnapshot = await getDocs(friendPostsQuery);

              return friendPostsSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                  id: doc.id,
                  liked: data.liked || [],
                  name: data.name,
                  content: data.content,
                  avatar: data.avatar,
                  imageUrl: data.imageUrl,
                  timestamp: data.timestamp,
                  comments: data.comments,
                } as IPostGet;
              });
            }

            return [];
          });

          const friendPostsData = await Promise.all(friendPostsPromises);

          const mergedPosts = friendPostsData
            .flat()
            .sort((a, b) => b.timestamp - a.timestamp);

          if (mergedPosts.length > 0) {
            setFriendPosts(mergedPosts);
          }
        }
      }
    } catch (error) {
      console.log("Error fetching friend posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendsPosts();
  }, [user, friendPosts]);

  useEffect(() => {
    setShowMenu(false);
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const uid = await useGetUserUid(user?.email!);

      if (uid) {
        const userId = uid;
        const postRef = doc(collection(db, "postagens"), postId);

        const postSnapshot = await getDoc(postRef);
        const postData = postSnapshot.data();

        if (postData) {
          const liked = postData.liked || [];

          if (liked.includes(userId)) {
            await updateDoc(postRef, {
              liked: liked.filter((id: string) => id !== userId),
            });
          } else {
            await updateDoc(postRef, {
              liked: [...liked, userId],
            });
          }

          // Atualiza o estado do post com a nova lista de curtidas
          const updatedPost = {
            ...postData,
            liked: liked.includes(userId)
              ? liked.filter((id: string) => id !== userId)
              : [...liked, userId],
          };

          // Atualiza o estado dos posts dos amigos com o post atualizado
          setFriendPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId ? { ...post, liked: updatedPost.liked } : post
            )
          );
        }
      }
    } catch (error) {
      console.error("Erro ao curtir o post:", error);
    }
  };

  return (
    <div>
      <Outlet />
      <S.FriendsContainer>
        <S.FriendsMessage>
          <h2>Feed dos Seus Contatos</h2>
          <p>Venha conferir a vibe dos seus amigos</p>
        </S.FriendsMessage>
        {loading ? (
          <Loading />
        ) : friendPosts.length > 0 ? (
          <PostGet
            userPosts={friendPosts}
            handleLike={handleLike}
            loading={loading}
          />
        ) : (
          <p>Nenhuma postagem encontrada.</p>
        )}
      </S.FriendsContainer>
    </div>
  );
};

export default Friends;
