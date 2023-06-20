//React
import { ReactNode } from "react";

// Define o tipo para os dados do usuário
export interface UserData {
  displayName: string;
  email: string;
  avatar: string;
  requestSend?: [];
  // outras informações adicionais do usuário...
}

export interface UserContextData {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export interface UserProviderProps {
  children: ReactNode;
}
