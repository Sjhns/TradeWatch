import { useState } from 'react';
import { LoginCredentials, AuthError } from '../../types/auth';
import { ChartBarIcon } from '@heroicons/react/24/outline';

interface LoginProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
  loading?: boolean;
  error?: string | null;
}

const Login = ({ onLogin, onSwitchToRegister, onForgotPassword, loading, error }: LoginProps) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [errorState, setError] = useState<AuthError>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!credentials.email.includes('@')) {
      setError({ field: 'email', message: 'Email inválido' });
      return;
    }
    if (credentials.password.length < 6) {
      setError({ field: 'password', message: 'Senha deve ter no mínimo 6 caracteres' });
      return;
    }

    try {
      setIsLoading(true);
      await onLogin(credentials);
    } catch (err) {
      setError({ field: 'submit', message: err instanceof Error ? err.message : 'Erro ao fazer login' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <ChartBarIcon className="h-12 w-12 text-primary-600 animate-pulse-slow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            TradeWatch
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Monitore seus investimentos de forma inteligente
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isLoading || loading}
                className={`input-primary ${
                  errorState?.field === 'email' ? 'border-danger-500 ring-danger-500' : ''
                }`}
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              {errorState?.field === 'email' && (
                <p className="mt-1 text-sm text-danger-500">{errorState.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={isLoading || loading}
                className={`input-primary ${
                  errorState?.field === 'password' ? 'border-danger-500 ring-danger-500' : ''
                }`}
                placeholder="Senha"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              {errorState?.field === 'password' && (
                <p className="mt-1 text-sm text-danger-500">{errorState.message}</p>
              )}
            </div>
          </div>

          {errorState?.field === 'submit' && (
            <div className="rounded-md bg-danger-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-danger-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-danger-800">
                    {errorState.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-danger-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-danger-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-danger-800">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                disabled={isLoading || loading}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Lembrar-me
              </label>
            </div>

            <button
              type="button"
              disabled={isLoading || loading}
              onClick={onForgotPassword}
              className="text-sm font-medium text-primary-600 hover:text-primary-500 disabled:opacity-50"
            >
              Esqueceu sua senha?
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 hover:shadow-neon disabled:opacity-50"
            >
              {(isLoading || loading) ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Ou continue com
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading || loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-primary-500 transition-all duration-300 disabled:opacity-50"
            >
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading || loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-primary-500 transition-all duration-300 disabled:opacity-50"
            >
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
              />
            </button>
            <button
              onClick={() => handleSocialLogin('linkedin')}
              disabled={isLoading || loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-primary-500 transition-all duration-300 disabled:opacity-50"
            >
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
                alt="LinkedIn"
              />
            </button>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button
              onClick={onSwitchToRegister}
              disabled={isLoading || loading}
              className="font-medium text-primary-600 hover:text-primary-500 disabled:opacity-50"
            >
              Registre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
