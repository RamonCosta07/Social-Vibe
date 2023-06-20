import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./styles/global.tsx";
import RoutesApp from "./routes/RoutesApp.tsx";
import { UserProvider } from "./customHooks/useUser.tsx";
import { MenuProvider } from "./contexts/useMenuSideBar.tsx";
import { ImportedGoogleUsersProvider } from "./contexts/ImportedGoogleUsersProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <UserProvider>
      <ImportedGoogleUsersProvider>
        <MenuProvider>
          <RoutesApp />
        </MenuProvider>
      </ImportedGoogleUsersProvider>
    </UserProvider>
  </React.StrictMode>
);
