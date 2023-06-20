// Styles
import * as S from "./NavbarStyles";
// Firebase
import { auth, db } from "../../services/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
// React Router Dom
import { useNavigate } from "react-router-dom";
// Hooks e Context
import { useEffect, useState, useContext } from "react";
import { useUser } from "../../customHooks/useUser";
import { MenuContext } from "../../contexts/useMenuSideBar";
import useGetUserUid from "../../customHooks/useGetUserId";
import useSearchUsers from "../../customHooks/useSearchUsers";
// Components
import SearchResults from "../searchResults/SearchResults";
import Notification from "../notification/Notification";
// Interfaces
import { IUserVerify } from "../../interfaces/IComponents/ISearchResults";
import { UserData } from "../../interfaces/ICustomHooks/IuseUser";

const Navbar = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user } = useUser();
  const [contactRequests, setContactRequests] = useState<number>(0);
  const { showMenu, setShowMenu } = useContext(MenuContext);
  const [showNotificationList, setShowNotificationList] = useState(false);
  const [contactPendentsData, setContactPendentsData] = useState<any>([]);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleRedirectProfile = () => {
    navigate("/profile");
  };

  const isOwnProfile = (userVerify: IUserVerify) => {
    return userVerify.email === user?.email;
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const searchQuery = (e.target as HTMLInputElement).value;
      if (searchQuery != "") {
        const results: any[] = await useSearchUsers(searchQuery);
        setSearchResults(results);
      }
    }

    if (e.key === "Backspace" && (e.target as HTMLInputElement).value === "") {
      setSearchResults([]);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.trim();
    if (searchQuery === "") {
      setSearchResults([]);
    }
  };

  // Verificar se amigo já existe
  const isFriend = async (userFriend: UserData) => {
    const uid = await useGetUserUid(user?.email!);
    const uidFriend = await useGetUserUid(userFriend.email);
    const userDocRef = doc(db, "users", uid!);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      if (userData.friends && userData.friends.includes(uidFriend)) {
        return true; // O usuário é amigo
      }
    }

    return false; // O usuário não é amigo
  };

  // Verificar se solicitação de amizade já foi enviada
  const isRequestSent = async (userFriend: UserData) => {
    try {
      const uid = await useGetUserUid(user?.email!);
      const uidFriend = await useGetUserUid(userFriend.email);
      const userRef = doc(db, "users", uid!);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const requestSend = userDoc.data()?.requestSend || [];
        return requestSend.includes(uidFriend);
      }

      return false;
    } catch (error) {
      console.error("Erro ao verificar se a solicitação foi enviada:", error);
      return false;
    }
  };

  // Adicionar contato
  const handleAddContact = async (userFriend: any) => {
    try {
      const uidFriend = await useGetUserUid(userFriend.email);
      const uid = await useGetUserUid(user?.email!);

      const userRef = doc(db, "users", uid!);
      const userFriendRef = doc(db, "users", uidFriend!);

      const userDoc = await getDoc(userRef);
      const userFriendDoc = await getDoc(userFriendRef);

      if (userDoc.exists() && userFriendDoc.exists()) {
        const existingRequestSend = userDoc.data()?.requestSend || [];
        const updatedRequestSend = [...existingRequestSend, uidFriend];

        const existingContactsPendents =
          userFriendDoc.data()?.contactsPendents || [];
        const updatedContactsPendents = [...existingContactsPendents, uid];

        await updateDoc(userRef, {
          requestSend: updatedRequestSend,
        });

        await updateDoc(userFriendRef, {
          contactsPendents: updatedContactsPendents,
        });
        setSearchResults([]);
      } else {
        console.log("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao enviar solicitação de contato:", error);
    }
  };

  const monitorContactRequests = (uidUser: string) => {
    const userRef = doc(db, "users", uidUser);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const userDoc = snapshot.data();
      const contactsPendents = userDoc?.contactsPendents || [];
      setContactRequests(contactsPendents.length);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const monitorUserContactRequests = async () => {
      const uid = await useGetUserUid(user?.email!);
      if (uid) {
        const unsubscribe = monitorContactRequests(uid);
        return () => {
          unsubscribe();
        };
      }
    };

    if (user?.email) {
      monitorUserContactRequests();
    } else {
      fetchContactPendentsData(); // Tenta buscar as notificações novamente
    }
  }, [user]);

  const fetchContactsPendentsIds = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userEmail = currentUser.email;

      const uid = await useGetUserUid(userEmail!);
      const userDoc = doc(db, "users", uid!);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const contactsPendentsIds = userData.contactsPendents || [];

        if (Array.isArray(contactsPendentsIds)) {
          return contactsPendentsIds;
        }
      }
    }
    return [];
  };

  // Verificar se tem solicitação pendente para user logado
  const isContactPending = async (email: string) => {
    const userSearch = await useGetUserUid(email);
    const uidUser = await useGetUserUid(user?.email!);

    const userRef = doc(db, "users", uidUser!);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const contactsPendents = userData?.contactsPendents || [];
      return contactsPendents.includes(userSearch);
    }

    return false;
  };

  // Função para buscar os solicitações pendentes no Firestore
  const fetchContactPendentsData = async () => {
    const contactsPendentsIds = await fetchContactsPendentsIds();
    if (contactsPendentsIds.length === 0) return;

    if (
      !Array.isArray(contactsPendentsIds) ||
      contactsPendentsIds.length === 0
    ) {
      return;
    }

    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    const contactPendents: any[] = [];

    querySnapshot.forEach((doc) => {
      const contactData = doc.data();
      if (contactsPendentsIds.includes(doc.id) && contactData) {
        contactPendents.push(contactData);
      }
    });

    setContactPendentsData(contactPendents);
  };

  useEffect(() => {
    fetchContactPendentsData();
  }, []);

  const handleNotificationClick = () => {
    if (user?.email) {
      setShowNotificationList(!showNotificationList);
    }
  };

  // Remover da Lista de requestSend
  const removeFromRequestSend = async (userId: string, contactId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const existingRequestSend = userDoc.data()?.requestSend || [];
        const updatedRequestSend = existingRequestSend.filter(
          (uid: string) => uid !== contactId
        );

        await updateDoc(userRef, {
          requestSend: updatedRequestSend,
        });
      } else {
        console.log("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao remover o ID da lista 'requestSend':", error);
    }
  };

  const updateContactPendents = async () => {
    fetchContactPendentsData();
  };

  // Remover solicitação
  const handleRemoveContact = async (contactEmail: string) => {
    try {
      const uid = await useGetUserUid(user?.email!);
      const uidContact = await useGetUserUid(contactEmail);
      const userRef = doc(db, "users", uid!);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const existingContactsPendents = userDoc.data()?.contactsPendents || [];
        const updatedContactsPendents = existingContactsPendents.filter(
          (uid: string) => uid !== uidContact
        );

        await updateDoc(userRef, {
          contactsPendents: updatedContactsPendents,
        });

        await removeFromRequestSend(uidContact!, uid!);
        setContactPendentsData(updatedContactsPendents);
        updateContactPendents();
      } else {
        console.log("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao remover o contato:", error);
    }
  };

  // Aceitar solicitação
  const handleConfirmContact = async (contactEmail: string) => {
    try {
      const uid = await useGetUserUid(user?.email!);
      const uidContact = await useGetUserUid(contactEmail);

      const userRef = doc(db, "users", uid!);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const existingContactsPendents = userDoc.data()?.contactsPendents || [];
        const updatedContactsPendents = existingContactsPendents.filter(
          (uid: string) => uid !== uidContact
        );

        const existingFriends = userDoc.data()?.friends || [];
        const updatedFriends = [...existingFriends, uidContact];

        await updateDoc(userRef, {
          contactsPendents: updatedContactsPendents,
          friends: updatedFriends,
        });

        // Adicionar o ID do usuário atual na lista de amigos do contato
        const contactRef = doc(db, "users", uidContact!);
        const contactDoc = await getDoc(contactRef);

        if (contactDoc.exists()) {
          const existingContactFriends = contactDoc.data()?.friends || [];
          const updatedContactFriends = [...existingContactFriends, uid];

          await updateDoc(contactRef, {
            friends: updatedContactFriends,
          });
          await removeFromRequestSend(uidContact!, uid!);
          setContactPendentsData(updatedContactsPendents);
          updateContactPendents();
        } else {
          console.log("Contato não encontrado");
        }
      } else {
        console.log("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao confirmar o contato:", error);
    }
  };

  const handleOpenMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <S.NavbarContainer>
      <S.Logo src="/icon.png" alt="Logo" />
      <S.SearchRelative>
        <S.SearchContainer>
          <S.SearchIcon />
          <S.SearchInput
            type="text"
            placeholder="Pesquisar usuários..."
            onKeyDown={handleSearch}
            onChange={handleSearchInput}
          />

          {searchResults.length > 0 && (
            <SearchResults
              searchResults={searchResults}
              isOwnProfile={isOwnProfile}
              handleAddContact={handleAddContact}
              isFriend={isFriend}
              isRequestSent={isRequestSent}
              isContactPending={isContactPending}
            />
          )}
        </S.SearchContainer>
      </S.SearchRelative>

      <S.MenuBottons>
        <S.MenuModal title="Abrir menu lateral" onClick={handleOpenMenu} />

        <S.PerfilButton title="Perfil" onClick={handleRedirectProfile}>
          {!user?.avatar && <S.PerfilIcon />}
          {user?.avatar && (
            <S.ProfileImage src={user?.avatar} alt={user?.displayName} />
          )}
        </S.PerfilButton>

        <Notification
          handleNotificationClick={handleNotificationClick}
          contactRequests={contactRequests}
          showNotificationList={showNotificationList}
          contactPendentsData={contactPendentsData}
          handleRemoveContact={handleRemoveContact}
          handleConfirmContact={handleConfirmContact}
        />

        <S.LogoutButton title="Sair" onClick={handleLogout}>
          <S.LogoutIcon />
          Sair
        </S.LogoutButton>
      </S.MenuBottons>
    </S.NavbarContainer>
  );
};

export default Navbar;
