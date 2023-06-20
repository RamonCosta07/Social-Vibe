// Styles
import * as S from "./UsersStyles";
// React Router Dom
import { Outlet } from "react-router-dom";
// Hooks e Contexts
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../contexts/useMenuSideBar";
import useGenerateRandomId from "../../customHooks/useGenerateRandomId";
// Firebase
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
// Components
import Loading from "../../components/loading/Loading";
// Interfaces
import { User } from "../../interfaces/IComponents/IUsers";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { setShowMenu } = useContext(MenuContext);

  useEffect(() => {
    setShowMenu(false);
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersCollection = collection(db, "users");
        const usersQuery = query(usersCollection, orderBy("displayName"));
        const querySnapshot = await getDocs(usersQuery);

        const usersData: User[] = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data() as User;
          usersData.push(userData);
        });

        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Outlet />
      <S.UsersContainer>
        <div>
          <S.HeaderUsers>
            <h1>Guia dos Usuários do Social Vibe</h1>
            <S.IconSearchUsers />
          </S.HeaderUsers>
          <S.AlertUsers>
            <p>Pesquise pelo nome para poder adicionar aos contatos</p>
          </S.AlertUsers>
          {loading ? (
            <Loading />
          ) : (
            <S.UserGrid>
              {users.map((user) => (
                <S.UserContainer key={useGenerateRandomId() + user.displayName}>
                  {user.avatar ? (
                    <S.UserAvatar src={user.avatar} alt={user.displayName} />
                  ) : (
                    <S.UserIcon />
                  )}
                  <S.DisplayName>{user.displayName}</S.DisplayName>
                </S.UserContainer>
              ))}
            </S.UserGrid>
          )}
        </div>
      </S.UsersContainer>
    </>
  );
};

export default Users;
