// Firebase
import { User } from 'firebase/auth';

export interface IPrivateRouteProps {
  children: React.ReactNode;
  user: User | null;
}
