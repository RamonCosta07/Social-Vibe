// Firebase
import { Timestamp } from "firebase/firestore";

export interface IPostGet {
  timestamp: Timestamp;
  id: string;
  liked: string;
  name: string;
  content: string;
  avatar: string;
  imageUrl?: string;
  comments?: string[];
}

export interface IPostGetProps {
  userPosts: IPostGet[];
  loading: boolean;
  handleLike: (postId: string) => Promise<void>;
  openDeleteModal?: (postId: string) => void;
}

export interface ILikeButtonProps {
  liked: string;
}

export interface IComment {
  id: string;
  postId: string;
  userId: string;
  comment: string;
  displayName: string;
  avatar: string;
  timestamp: number;
}