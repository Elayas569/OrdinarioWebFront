import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token"); // Or use your auth logic

  return isLoggedIn ? children : <Navigate to="/sing-in" replace />;
};

export default PrivateRoute;
