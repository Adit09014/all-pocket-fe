import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./CheckAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
