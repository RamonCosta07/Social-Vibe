// Hooks
import { createContext, useState } from "react";
// Interfaces
import { MenuContextProps, MenuProviderProps } from "../interfaces/IContext/IUseMenuSideBar";

export const MenuContext = createContext<MenuContextProps>({
  showMenu: false,
  setShowMenu: () => {},
});

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <MenuContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
