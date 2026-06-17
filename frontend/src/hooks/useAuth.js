import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "User";
  const role = localStorage.getItem("role") || "Viewer";

  const isAuthenticated = Boolean(token);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    navigate("/");
  };

  return {
    token,
    userName,
    role,
    isAuthenticated,
    logout,
  };
}

export default useAuth;