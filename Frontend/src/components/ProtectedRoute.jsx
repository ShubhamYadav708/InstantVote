import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const token = getAuth();
  const location = useLocation();
  
  if (location.pathname.startsWith("/poll")) {
    return children;
  }

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
