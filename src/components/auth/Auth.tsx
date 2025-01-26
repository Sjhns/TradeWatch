import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import { LoginCredentials, RegisterCredentials } from "../../types/auth";

type AuthView = "login" | "register" | "forgot-password";

interface AuthProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  onRegister: (credentials: RegisterCredentials) => Promise<void>;
  onForgotPassword: (email: string) => Promise<void>;
}

const Auth = ({ onLogin, onRegister, onForgotPassword }: AuthProps) => {
  const [view, setView] = useState<AuthView>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      await onLogin(credentials);
      navigate("/");
    } catch (error) {
      setError("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    setLoading(true);
    try {
      await onRegister(credentials);
      navigate("/");
    } catch (error) {
      setError("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await onForgotPassword(email);
      setView("login");
    } catch (error) {
      setError("Failed to send password reset email");
    } finally {
      setLoading(false);
    }
  };

  const renderView = () => {
    switch (view) {
      case "login":
        return (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() => setView("register")}
            onForgotPassword={() => setView("forgot-password")}
            loading={loading}
            error={error}
          />
        );
      case "register":
        return (
          <Register
            onRegister={handleRegister}
            onSwitchToLogin={() => setView("login")}
            loading={loading}
            error={error}
          />
        );
      case "forgot-password":
        return (
          <ForgotPassword
            onSubmit={handleForgotPassword}
            onBackToLogin={() => setView("login")}
            loading={loading}
            error={error}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10" />
      <div className="relative">{renderView()}</div>
    </div>
  );
};

export default Auth;
