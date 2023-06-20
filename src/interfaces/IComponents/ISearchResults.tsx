// Interfaces
import { UserData } from "../ICustomHooks/IuseUser";

export interface IUserVerify {
  email: string;
}

export interface ISearchResultsProps {
  searchResults: any[];
  isOwnProfile: (userVerify: IUserVerify) => boolean;
  handleAddContact: (user: any) => void;
  isFriend: (userFriend: UserData) => Promise<boolean>;
  isRequestSent: (userFriend: UserData) => Promise<any>;
  isContactPending: (email: string) => Promise<any>
}
