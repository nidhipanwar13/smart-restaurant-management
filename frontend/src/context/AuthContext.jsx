import {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getProfile } from "../services/authService";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await getProfile(token);

        const profile = response.data;

        setUser(profile);

        localStorage.setItem(
          "user",
          JSON.stringify(profile)
        );

        localStorage.setItem(
          "role",
          profile.role
        );
      } catch (error) {
        console.error("Profile fetch failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;