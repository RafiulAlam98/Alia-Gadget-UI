/* eslint-disable react/prop-types */
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../shared/Loading";


const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  if (loading) {
    return <Loading/>
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
