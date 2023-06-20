// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

const useGetUserUid = async (email: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    const userDoc = querySnapshot.docs[0];
    const userUid = userDoc.id;
    return userUid;
  } else {
    console.log("Usuário não encontrado");
    return null;
  }
};

export default useGetUserUid;
