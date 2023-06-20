// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

const useSearchUsers = async (searchQuery: string) => {
    const usersRef = collection(db, "users");
  
    let modifiedQuery = searchQuery.trim();
    const queryParts = modifiedQuery.split(" ");
    const modifiedQueryParts = queryParts.map((part) => {
      const firstLetter = part.charAt(0).toUpperCase();
      const restOfWord = part.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    });
  
    // Juntar as partes novamente em uma única string
    modifiedQuery = modifiedQueryParts.join(" ");
  
    const q = query(
      usersRef,
      where("displayName", ">=", modifiedQuery),
      where("displayName", "<=", modifiedQuery + "\uf8ff")
    );
  
    const querySnapshot = await getDocs(q);
  
    const results: any[] = [];
    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });
  
    return results;
};
  
export default useSearchUsers;