// React
import { ReactNode } from "react";

export interface MenuContextProps {
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
}

export interface MenuProviderProps {
  children: ReactNode;
}
