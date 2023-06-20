// React
import { createContext, useContext, useState, useEffect } from "react";
// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase";
// Interfaces
import {
  UserContextData,
  UserData,
  UserProviderProps,
} from "../interfaces/ICustomHooks/IuseUser";

const UserContext = createContext<UserContextData>({
  user: null,
  setUser: () => {},
});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );

        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
          const userData = userQuerySnapshot.docs[0].data() as UserData;
          setUser(userData);
        } else {
          await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName || user.email,
            email: user.email,
            avatar: "",
            contactsPendents: [],
            friends: [],
            requestSend: [],
          });
        }
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data() as UserData;
            setUser(userData);
          }
        });

        return () => {
          unsubscribeUser();
        };
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextData => {
  const { user, setUser } = useContext(UserContext);
  return {user, setUser};
};

export { UserProvider, useUser };