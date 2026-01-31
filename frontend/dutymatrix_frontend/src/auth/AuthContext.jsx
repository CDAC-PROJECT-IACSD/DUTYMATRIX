import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load persisted auth state
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // Authentication flag
  const isAuthenticated = Boolean(token);

  // Extract role safely
  const role = user?.role || null;

  // Role-based helpers (MATCH BACKEND ENUMS)
  const isOfficer = role === "POLICE_OFFICER";
  const isStationIncharge = role === "STATION_INCHARGE";
  const isCommissioner = role === "COMMISSIONER";

  // Login handler
  const login = (loginResponse) => {
    const { token, ...userData } = loginResponse;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(token);
    setUser(userData);
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        isOfficer,
        isStationIncharge,
        isCommissioner,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
