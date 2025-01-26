import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { LoginCredentials, RegisterCredentials } from "../types/auth";
import { Profile, ProfileUpdateData } from "../types/profile";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfile({
        id: parsedUser.id,
        name: parsedUser.name,
        email: parsedUser.email,
        phone: "",
        occupation: "",
        tradingExperience: "beginner",
        preferredMarkets: [],
        notifications: {
          email: true,
          push: true,
          priceAlerts: true,
          newsAlerts: false,
          marketUpdates: true,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, []);

  const signIn = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: "1",
        name: "Usuário Teste",
        email: credentials.email,
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      navigate("/");
    } catch (err) {
      setError("Erro ao fazer login. Por favor, tente novamente.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (credentials: RegisterCredentials) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: "1",
        name: credentials.name,
        email: credentials.email,
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      navigate("/");
    } catch (err) {
      setError("Erro ao criar conta. Por favor, tente novamente.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Reset password for:", email);
    } catch (err) {
      setError(
        "Erro ao enviar email de recuperação. Por favor, tente novamente."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (profile) {
        const updatedProfile = {
          ...profile,
          ...data,
          notifications: {
            ...profile.notifications,
            ...(data.notifications || {}),
          },
          updatedAt: new Date().toISOString(),
        };
        setProfile(updatedProfile);

        if (data.name && user) {
          const updatedUser = { ...user, name: data.name };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
    } catch (err) {
      setError("Erro ao atualizar perfil. Por favor, tente novamente.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      error,
      signIn,
      signUp,
      signOut,
      forgotPassword,
      updateProfile,
    }),
    [user, profile, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
