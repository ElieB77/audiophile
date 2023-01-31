import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContext {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext({} as AuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setTokenState] = useState<any>(null);

  useEffect(() => {
    setTokenState(() => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("token");
      }
      return null;
    });
  }, [token]);

  const setToken = (token: string) => {
    setTokenState(token);
    localStorage.setItem("token", token);
  };

  const removeToken = () => {
    setTokenState(null);
    localStorage.removeItem("token");
  };

  const isLoggedIn = () => {
    return token !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        removeToken,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
