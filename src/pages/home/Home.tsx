// React Router Dom
import { Outlet } from "react-router-dom";
// Styles
import * as S from "./HomeStyles";
// Hooks
import { useUser } from "../../customHooks/useUser";
import { useState, useEffect, useContext } from "react";
import { MenuContext } from "../../contexts/useMenuSideBar";
import { useImportedGoogleUsersContext } from "../../contexts/ImportedGoogleUsersProvider";
import useGetUserUid from "../../customHooks/useGetUserId";
import useExtractFileNameFromImageUrl from "../../customHooks/useExtractFileNameFromImage";
import useGenerateRandomName from "../../customHooks/useGenerateRandomName";
// Components
import PostForm from "../../components/postForm/PostForm";
import PostGet from "../../components/postGet/PostGet";
import ModalDelete from "../../components/modalDelete/ModalDelete";
// Firebase
import { db, auth } from "../../services/firebase";
import "firebase/firestore";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadString,
  deleteObject,
} from "firebase/storage";
// Interfaces
import { IPostGet } from "../../interfaces/IComponents/IPostGet";

const Home = () => {
  const { user } = useUser();
  const { importedGoogleUsers } = useImportedGoogleUsersContext();
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<IPostGet[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { setShowMenu } = useContext(MenuContext);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const storage = getStorage();

  useEffect(() => {
    setShowMenu(false);
  }, []);

  // Criar nova postagem
  const handlePost = async (content: string, image?: File | null) => {
    try {
      const currentUser = auth.currentUser;
      const userId = await useGetUserUid(currentUser?.email!);
      if (currentUser && userId) {
        const name = user?.displayName;
        const avatar = user?.avatar;
        let imageUrl = "";

        if (image) {
          // Fazer o upload da imagem para o Firebase Storage
          const imageName = useGenerateRandomName(image.name);
          const storageRef = ref(storage, "images/" + imageName);

          // Converter o objeto File em uma string usando FileReader
          const reader = new FileReader();
          reader.onload = async () => {
            const fileDataUrl = reader.result as string;
            await uploadString(storageRef, fileDataUrl, "data_url");

            // Obter o URL da imagem
            imageUrl = await getDownloadURL(storageRef);

            // Criar o objeto de postagem com a URL da imagem
            const post = {
              name,
              avatar,
              content,
              liked: [],
              timestamp: serverTimestamp(),
              userId: userId,
              imageUrl,
            };
            await addDoc(collection(db, "postagens"), post);
          };
          reader.readAsDataURL(image);
        } else {
          // Caso não haja imagem, criar o objeto de postagem sem a URL da imagem
          const post = {
            name,
            avatar,
            content,
            liked: [],
            timestamp: serverTimestamp(),
            userId: userId,
          };
          await addDoc(collection(db, "postagens"), post);
        }
      }
    } catch (error) {
      console.error("Erro ao adicionar postagem:", error);
    }
  };

  // Excluir Post
  const handleDelete = async (postId: string) => {
    try {
      const postDoc = doc(db, "postagens", postId);
      const postSnapshot = await getDoc(postDoc);
      const post = postSnapshot.data();
      const imageUrl = post?.imageUrl;
      // Exclui a imagem do Firebase Storage, se houver uma URL de imagem
      if (imageUrl) {
        // Extrair o nome do arquivo da URL da imagem
        const fileName = useExtractFileNameFromImageUrl(imageUrl);
        const imageRef = ref(storage, "" + fileName);
        // Excluir o arquivo do Firebase Storage
        await deleteObject(imageRef);
      }
      await deleteDoc(postDoc);
    } catch (error) {
      console.error("Erro ao excluir o post:", error);
    }
  };

  // Curtida
  const handleLike = async (postId: string) => {
    try {
      if (user) {
        const userId = await useGetUserUid(user?.email);
        const postRef = doc(db, "postagens", postId);
        // Verifique se o usuário já curtiu o post
        const postSnapshot = await getDoc(postRef);
        const postData = postSnapshot.data();

        if (postData && postData.liked && postData.liked.includes(userId)) {
          // Se o usuário já curtiu o post, remove a curtida
          await updateDoc(postRef, {
            liked: postData.liked.filter((id: string) => id !== userId),
          });
        } else {
          // Se o usuário ainda não curtiu o post, adiciona a curtida
          await updateDoc(postRef, {
            liked: [...(postData?.liked || []), userId],
          });
        }
      }
    } catch (error) {
      console.error("Erro ao curtir o post:", error);
    }
  };

  // Get nas postagens do usuário
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const currentUser = auth.currentUser;
        const currentUid = await useGetUserUid(currentUser?.email!);

        if (currentUid) {
          const userId = currentUid;
          const userPostsQuery = query(
            collection(db, "postagens"),
            where("userId", "==", userId),
            orderBy("timestamp", "desc")
          );

          const querySnapshot = await getDocs(userPostsQuery);

          const posts: IPostGet[] = [];
          querySnapshot.forEach((doc) => {
            const post = {
              id: doc.id,
              ...doc.data(),
            } as IPostGet;
            posts.push(post);
          });
          setUserPosts(posts);
          // Adicionar listener em tempo real para atualizações
          const unsubscribe = onSnapshot(userPostsQuery, (snapshot) => {
            const updatedPosts: IPostGet[] = [];
            snapshot.forEach((doc) => {
              const post = {
                id: doc.id,
                ...doc.data(),
              } as IPostGet;
              updatedPosts.push(post);
            });
            setUserPosts(updatedPosts);
          });

          // Remover o listener quando o componente for desmontado
          setLoading(false);
          return () => {
            unsubscribe();
          };
        }
      } catch (error) {
        console.error("Erro ao obter as postagens do usuário:", error);
      }
      setLoading(false);
    };

    fetchUserPosts();
  }, [auth.currentUser?.uid, importedGoogleUsers]);

  const handleConfirmDelete = () => {
    handleDelete(postIdToDelete);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const openDeleteModal = (postId: string): void => {
    setPostIdToDelete(postId);
    setShowModal(true);
  };

  return (
    <>
      <Outlet />
      <S.HomeContainer>
        <h3>
          Qual a vibe hoje
          {user?.displayName ? ", " + user.displayName.split(" ")[0] : null}?
        </h3>

        {!loading && <PostForm onPost={handlePost} />}
        <PostGet
          userPosts={userPosts}
          loading={loading}
          handleLike={handleLike}
          openDeleteModal={openDeleteModal}
        />
      </S.HomeContainer>

      {showModal && (
        <ModalDelete
          msg={"Deseja mesmo excluir essa postagem?"}
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </>
  );
};

export default Home;
