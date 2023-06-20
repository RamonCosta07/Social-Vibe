// Styles
import * as S from "./SideBarStyles";
// Icons
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
// React Router Dom
import { useNavigate, useLocation } from "react-router-dom";
// Hooks
import { useUser } from "../../customHooks/useUser";
import { useState, useContext, useEffect } from "react";
import { MenuContext } from "../../contexts/useMenuSideBar";
// Components
import ModalOpenPhoto from "../modalOpenPhoto/ModalOpenPhoto";

const SideBar = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { showMenu, setShowMenu } = useContext(MenuContext);

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleFriends = () => {
    navigate("/friends");
  };

  const handleUsers = () => {
    navigate("/users");
  };

  const handleProfilePictureClick = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showMenu]);

  const handleCloseMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {showMenu && <S.Overlay />}
      <S.SidebarWrapper
        avatar={user?.avatar ? "true" : "false"}
        showmenu={showMenu ? "true" : "false"}
      >
        <S.MenuModalContainer>
          <S.MenuModal title="Fechar menu lateral" onClick={handleCloseMenu} />
        </S.MenuModalContainer>
        <ul>
          <li className="profile-picture">
            {user?.avatar ? (
              <S.ProfilePictureContainer>
                <S.ProfilePicture
                  src={user.avatar}
                  alt={user.displayName}
                  title="Expandir"
                  onClick={() => handleProfilePictureClick(user?.avatar)}
                />
              </S.ProfilePictureContainer>
            ) : (
              <S.ProfilePictureIcon title="Adicione uma foto na guia de perfil" />
            )}
            {selectedPhoto && (
              <ModalOpenPhoto onClose={handleCloseModal}>
                <S.ModalImage
                  src={selectedPhoto}
                  alt="Foto do post em tamanho real"
                />
              </ModalOpenPhoto>
            )}
          </li>
          <li
            title="Ir para Home"
            onClick={handleHome}
            className={location.pathname === "/" ? "active" : ""}
          >
            <AiOutlineHome />
            <span>Home</span>
          </li>

          <li
            title="Ir para configurações"
            onClick={handleProfile}
            className={location.pathname === "/profile" ? "active" : ""}
          >
            <BsGearFill />
            <span>Perfil</span>
          </li>

          <li
            title="Ir para feed dos amigos"
            className={location.pathname === "/friends" ? "active" : ""}
            onClick={handleFriends}
          >
            <FaUserFriends />
            <span>Amigos</span>
          </li>
          <li
            title="Ir para guia dos usuários da rede"
            className={location.pathname === "/users" ? "active" : ""}
            onClick={handleUsers}
          >
            <FaUsers />
            <span>Usuários</span>
          </li>
        </ul>
      </S.SidebarWrapper>
    </>
  );
};

export default SideBar;
