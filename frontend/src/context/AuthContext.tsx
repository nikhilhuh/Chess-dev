import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axiosInstance from "../services/axios/axiosInstance";
import { setAuthToken } from "../services/auth/SetAuthToken";
import { signInCredentials, User } from "../utils/constants";

// Define the AuthContextType interface
interface AuthContextType {
  user: User | null;
  signUp: (credentials: User) => Promise<void>;
  signIn: (credentials: signInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  changePassword: (credentials: any) => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define a custom hook to use player context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

// Create a provider component
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      getUser();
    }
  }, []);

  const getUser = async () => {
    try {
      const res = await axiosInstance.get("/user/get-user");
      setUser(res.data);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const signUp = async (credentials: User) => {
    await axiosInstance.post("/user/signup", credentials);
  };

  const signIn = async (credentials: signInCredentials) => {
    const res = await axiosInstance.post("/user/signin", credentials);
    setAuthToken(res.data.token);
    setUser(res.data.user);
  };

  const signOut = async () => {
    setUser(null);
    setAuthToken(null);
  };

  const changePassword = async (credentials: any) => {
    await axiosInstance.put("/user/change-password", credentials);
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, signOut, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
