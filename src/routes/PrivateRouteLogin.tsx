// React Router Dom
import { Navigate} from "react-router-dom";
// Interface
import { IPrivateRouteProps } from "../interfaces/IRoutes/IPrivateRoute";

const PrivateRouteLogin = ({ children, user }: IPrivateRouteProps) => {
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRouteLogin;