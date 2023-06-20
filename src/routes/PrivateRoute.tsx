// React Router Dom
import { Navigate} from "react-router-dom";
// Interface
import { IPrivateRouteProps } from "../interfaces/IRoutes/IPrivateRoute";

const PrivateRoute = ({ children, user }: IPrivateRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;