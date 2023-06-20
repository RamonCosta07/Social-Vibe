// Interfaces
import { IComment, IPostGet } from "./IPostGet";

export interface IModalCommentsProps {
  post: IPostGet;
  handleCloseModalComments: () => void;
  comments: IComment[];
}
