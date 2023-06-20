// Styles
import * as S from "./ProfileStyles";
import { Button } from "../../styles/Button";
// React Router Dom
import { Outlet, useNavigate } from "react-router-dom";
// Hooks e Contexts
import { useUser } from "../../customHooks/useUser";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../contexts/useMenuSideBar";
import useGetUserUid from "../../customHooks/useGetUserId";
import useGenerateRandomName from "../../customHooks/useGenerateRandomName";
import useExtractFileNameFromImageUrl from "../../customHooks/useExtractFileNameFromImage";
// Components
import ModalNameEdit from "../../components/modalNameEdit/ModalNameEdit";
import ModalDelete from "../../components/modalDelete/ModalDelete";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
// Icons
import { BsImage, BsPencil } from "react-icons/bs";
import { GiAnimalSkull } from "react-icons/gi";
// Firebase
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { deleteUser, getAuth } from "firebase/auth";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { setShowMenu } = useContext(MenuContext);
  const [showModalPhoto, setShowModalPhoto] = useState(false);
  const [showModalDeleteAccount, setShowModalDeleteAccount] = useState(false);
  const [secondsRemaining] = useState(7);
  const [newName, setNewName] = useState("");
  const [errorNewName, setErrorNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState("");
  const currentUser = auth.currentUser;

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setShowMenu(false);
  }, []);

  const handleName = () => {
    setShowModal(true);
  };

  const isNameValid = () => {
    const nameParts = newName.trim().split(" ");
    setErrorNewName("");

    if (nameParts.length >= 2) {
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];

      if (lastName === "") {
        setErrorNewName("Preencha o sobrenome");
        return false;
      }

      if (newName.length > 30) {
        setErrorNewName("Nome completo deve ter no máximo 30 caracteres");
        return false;
      }

      if (firstName.length < 3) {
        setErrorNewName("Primeiro nome deve ter no mínimo 3 caracteres");
        return false;
      }

      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(newName)) {
        setErrorNewName("Nome não pode conter números ou caracteres especiais");
        return false;
      }

      return true;
    }

    setErrorNewName("Preencha o nome completo");
    return false;
  };

  // Name Update
  const handleNameUpdate = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;

      if (currentUser) {
        const email = currentUser.email;
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", email)
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          const userRef = doc(db, "users", userDoc.id);

          // Converter o nome para o formato desejado
          const formattedName = newName
            .split(" ") // Dividir a string em um array de palavras
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
          const updatedUserData: any = {
            ...user,
            displayName: formattedName,
          };
          setUser(updatedUserData);

          await updateDoc(userRef, {
            displayName: formattedName,
          });
        } else {
          console.log("Error");
        }
        setShowModal(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar o nome:", error);
    }
    setLoading(false);
    setNewName("");
  };

  // Atualizar nome nas postagens
  useEffect(() => {
    const updateUserName = async () => {
      if (currentUser) {
        const userId = await useGetUserUid(currentUser.email!);

        // Buscar todas as postagens do usuário pelo userId
        const userPostsQuery = query(
          collection(db, "postagens"),
          where("userId", "==", userId)
        );
        const userPostsSnapshot = await getDocs(userPostsQuery);

        if (!userPostsSnapshot.empty) {
          const batch = writeBatch(db);
          userPostsSnapshot.forEach((postDoc) => {
            const postRef = doc(db, "postagens", postDoc.id);
            if (user?.displayName) {
              batch.update(postRef, { name: user?.displayName });
            }
          });
          await batch.commit();
        }
      }
    };
    updateUserName();
  }, [user?.displayName]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const storage = getStorage();
      const imageName = useGenerateRandomName(file.name);
      const storageRef = ref(storage, `avatars/${imageName}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      // Atualiza o campo "avatar" do usuário no Firestore
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", currentUser.email)
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          const userRef = doc(db, "users", userDoc.id);

          // Obter a URL da foto anterior
          const userOldData = userDoc.data();
          const oldAvatarURL = userOldData?.avatar;

          // Excluir o arquivo anterior do Storage, se existir
          if (oldAvatarURL) {
            const decodedURL = decodeURIComponent(oldAvatarURL);
            const oldFileName = getFileNameFromURL(decodedURL);
            const oldAvatarRef = ref(storage, `avatars/${oldFileName}`);

            // Verificar se o arquivo existe antes de excluir
            const oldAvatarSnapshot = await getMetadata(oldAvatarRef);
            if (oldAvatarSnapshot) {
              await deleteObject(oldAvatarRef);
            } else {
              console.log(
                "Arquivo anterior não encontrado no Firebase Storage"
              );
            }
          }

          // Atualizar o avatar do usuário
          await updateDoc(userRef, {
            avatar: downloadURL,
          });

          const updatedUserData: any = {
            ...user,
            avatar: downloadURL,
          };
          setUser(updatedUserData);

          // Atualizar foto nas postagens
          const userId = await useGetUserUid(currentUser.email!);
          const userPostsQuery = query(
            collection(db, "postagens"),
            where("userId", "==", userId)
          );
          const userPostsSnapshot = await getDocs(userPostsQuery);

          if (!userPostsSnapshot.empty) {
            const batch = writeBatch(db);
            userPostsSnapshot.forEach((postDoc) => {
              const postRef = doc(db, "postagens", postDoc.id);
              batch.update(postRef, { avatar: downloadURL });
            });
            await batch.commit();
          }
        } else {
          console.log("Erro ao atualizar o avatar: Usuário não encontrado");
        }
      }
    }
  };

  // Função auxiliar para extrair o nome do arquivo da URL
  function getFileNameFromURL(url: string): string {
    const startSliceIndex = url.lastIndexOf("/") + 1;
    const endSliceIndex = url.indexOf("?alt=media");
    return url.slice(startSliceIndex, endSliceIndex);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  // Excluir foto de perfil
  const handleDelete = () => {
    setShowModalPhoto(true);
  };

  const handleDeletePhoto = async () => {
    const userId = await useGetUserUid(user?.email!);
    const userDocRef = doc(db, "users", userId!);
    try {
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const avatarUrl = userDoc.data().avatar;

        if (avatarUrl) {
          const storage = getStorage();
          const photoRef = ref(storage, avatarUrl);
          await deleteObject(photoRef);
        }

        await updateDoc(userDocRef, { avatar: "" });
        const updatedUserData: any = {
          ...user,
          avatar: "",
        };
        setUser(updatedUserData);

        const userPostsQuery = query(
          collection(db, "postagens"),
          where("userId", "==", userId)
        );
        const userPostsSnapshot = await getDocs(userPostsQuery);

        if (!userPostsSnapshot.empty) {
          const batch = writeBatch(db);
          userPostsSnapshot.forEach((postDoc) => {
            const postRef = doc(db, "postagens", postDoc.id);
            batch.update(postRef, { avatar: "" });
          });
          await batch.commit();
        }
      } else {
        console.error("Usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao excluir a foto de perfil:", error);
    }
  };

  const handleConfirmDelete = () => {
    handleDeletePhoto();
    setShowModalPhoto(false);
  };

  const handleCancelDelete = () => {
    setShowModalPhoto(false);
  };

  // Excluir conta
  const handleDeleteAccount = async () => {
    setLoadingDelete(true);
    try {
      if (currentUser) {
        const userId = await useGetUserUid(currentUser.email!);

        // Excluir as postagens do usuário
        const userPostsQuery = query(
          collection(db, "postagens"),
          where("userId", "==", userId)
        );
        const userPostsSnapshot = await getDocs(userPostsQuery);

        if (!userPostsSnapshot.empty) {
          const storage = getStorage();

          for (const postDoc of userPostsSnapshot.docs) {
            const postId = postDoc.id;
            const post = postDoc.data();
            const imageUrl = post.imageUrl;

            if (imageUrl) {
              try {
                const fileName = useExtractFileNameFromImageUrl(imageUrl);
                if (fileName) {
                  const imageRef = ref(storage, fileName);
                  await deleteObject(imageRef);
                }
              } catch (error) {
                console.error("Erro ao excluir a foto da postagem:", error);
              }
            }

            await deleteDoc(doc(db, "postagens", postId));
          }
        }

        // Excluir a imagem de perfil (se existir)
        if (user?.avatar) {
          const storage = getStorage();
          const photoRef = ref(storage, user.avatar);
          await deleteObject(photoRef);
        }

        // Remover o uid do usuário de todas as listas de amigos
        const usersQuery = query(collection(db, "users"));
        const usersSnapshot = await getDocs(usersQuery);

        if (!usersSnapshot.empty) {
          const batch = writeBatch(db);
          usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();

            if (userData.friends && userData.friends.indexOf(userId) !== -1) {
              const friendRef = doc(db, "users", userDoc.id);
              batch.update(friendRef, {
                friends: arrayRemove(userId),
              });
            }

            if (
              userData.contactsPendents &&
              userData.contactsPendents.indexOf(userId) !== -1
            ) {
              const contactPendentsRef = doc(db, "users", userDoc.id);
              batch.update(contactPendentsRef, {
                contactsPendents: arrayRemove(userId),
              });
            }

            if (
              userData.requestSend &&
              userData.requestSend.indexOf(userId) !== -1
            ) {
              const requestSendRef = doc(db, "users", userDoc.id);
              batch.update(requestSendRef, {
                requestSend: arrayRemove(userId),
              });
            }
          });

          await batch.commit();
        }

        // Excluir a conta do usuário do Firestore
        const userRef = doc(db, "users", userId!);
        await deleteDoc(userRef);

        // Excluir a conta do usuário do Firebase Authentication
        const firebaseAuth = getAuth();
        await deleteUser(firebaseAuth.currentUser!);

        navigate("/login");
      }
    } catch (error) {
      setErrorDelete(`Erro ao excluir a conta.\nTente novamente mais tarde`);
    }
    setLoadingDelete(false);
  };

  const handleShowModalDeleteAccount = () => {
    setShowModalDeleteAccount((prev) => !prev);
  };

  return (
    <S.ProfileContainer>
      {loadingDelete ? (
        <S.Excluding>
          <span>Excluindo sua conta, favor aguardar</span>
          <Loading />
        </S.Excluding>
      ) : (
        <>
          <Outlet />
          <S.ProfileDatas>
            <h2>Nome</h2>
            <S.NameEdit>
              <p>{user?.displayName}</p>
              <S.ButtonIcon onClick={handleName}>
                <BsPencil title="Editar" />
                <p>Editar</p>
              </S.ButtonIcon>

              {showModal && (
                <ModalNameEdit
                  newName={newName}
                  handleInputChange={handleInputChange}
                  loading={loading}
                  isNameValid={isNameValid}
                  handleNameUpdate={handleNameUpdate}
                  setNewName={setNewName}
                  setShowModal={setShowModal}
                  errorNewName={errorNewName}
                />
              )}
            </S.NameEdit>
          </S.ProfileDatas>

          <S.ProfileDatas>
            <h2>Foto de Perfil</h2>
            <S.ChangePhotoContainer>
              <S.ChangePhotoLabel htmlFor="photoInput" title="Alterar foto">
                <S.ChangePhotoButton>
                  <span>Mudar foto de perfil</span>
                  <BsImage />
                </S.ChangePhotoButton>
                <S.ChangePhotoInput
                  type="file"
                  id="photoInput"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </S.ChangePhotoLabel>
            </S.ChangePhotoContainer>

            {user?.avatar && (
              <S.DeletePhotoPerfil title="Excluir foto" onClick={handleDelete}>
                <span>Excluir foto</span>
                <S.DeletePhotoIcon />
              </S.DeletePhotoPerfil>
            )}
            {showModalPhoto && (
              <ModalDelete
                msg={"Deseja mesmo excluir sua foto de perfil?"}
                handleConfirmDelete={handleConfirmDelete}
                handleCancelDelete={handleCancelDelete}
              />
            )}
          </S.ProfileDatas>

          <S.ProfileDatas>
            <h2>E-mail</h2>
            <p>{user?.email}</p>
          </S.ProfileDatas>

          <S.ProfileDatas>
            <h2>Excluir a Conta</h2>
            {errorDelete && <Error>{errorDelete}</Error>}
            <S.DeleteAccount
              onClick={handleShowModalDeleteAccount}
              title="Excluir conta"
            >
              Deletar conta <GiAnimalSkull />
            </S.DeleteAccount>
            {showModalDeleteAccount && (
              <ModalDelete
                msg={
                  "Deseja mesmo excluir sua conta? Essa ação não poderá ser desfeita"
                }
                handleConfirmDelete={handleDeleteAccount}
                handleCancelDelete={handleShowModalDeleteAccount}
                secondsRemaining={secondsRemaining}
              />
            )}
          </S.ProfileDatas>

          <S.ButtonContainer title="Voltar a página inicial">
            <Button
              backgroundcolor="#1877F2"
              color="white"
              width="280px"
              hoverbackgroundcolor="#0762da"
              onClick={() => navigate("/")}
            >
              Voltar
            </Button>
          </S.ButtonContainer>
        </>
      )}
    </S.ProfileContainer>
  );
};

export default Profile;
