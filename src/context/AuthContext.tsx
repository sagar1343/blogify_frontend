import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../service/api";
import { IUser } from "../types/IUser";
import { AxiosError } from "axios";

interface AuthContextType {
  user: IUser | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  setUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token")
  );

  useEffect(() => {
    if (accessToken) {
      authenticated_user().then((res) => setUser(res));
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      const interval = setInterval(() => {
        refreshAccessToken();
      }, 4 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [accessToken, refreshToken]);

  async function login(credentials: { email: string; password: string }) {
    try {
      const response = await api.post("/auth/jwt/create/", credentials);
      const { access, refresh } = response.data;

      setAccessToken(access);
      setRefreshToken(refresh);

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setUserData();
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        throw new Error(error.response.data[0]);
      else throw new Error("An unexpected error occurred");
    }
  }

  async function refreshAccessToken() {
    try {
      const response = await api.post("/auth/jwt/refresh/", {
        refresh: refreshToken,
      });
      const { access } = response.data;
      setAccessToken(access);
      localStorage.setItem("access_token", access);
    } catch (error) {
      logout();
    }
  }

  function logout() {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  function setUserData() {
    authenticated_user().then((data) => setUser(data));
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

async function authenticated_user(): Promise<IUser> {
  const response = await api.get("/auth/users/me");
  return response.data;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
