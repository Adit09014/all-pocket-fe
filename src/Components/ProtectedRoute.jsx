import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const tokenExists = document.cookie.includes("token=");
  return tokenExists ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
