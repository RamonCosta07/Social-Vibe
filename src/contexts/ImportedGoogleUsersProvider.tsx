// Hooks
import { createContext, useContext, useState } from 'react';
// Interfaces
import { MenuProviderProps } from '../interfaces/IContext/IUseMenuSideBar';
import { ImportedGoogleUsersContextType } from '../interfaces/IContext/IImpotedGoogleUsers';

const ImportedGoogleUsersContext = createContext<ImportedGoogleUsersContextType>({
  importedGoogleUsers: false,
  setImportedGoogleUsers: () => {},
});

export const useImportedGoogleUsersContext = () => useContext(ImportedGoogleUsersContext);

export const ImportedGoogleUsersProvider = ({ children }: MenuProviderProps) => {
  const [importedGoogleUsers, setImportedGoogleUsers] = useState<boolean>(false);

  return (
    <ImportedGoogleUsersContext.Provider
      value={{ importedGoogleUsers, setImportedGoogleUsers }}
    >
      {children}
    </ImportedGoogleUsersContext.Provider>
  );
};
