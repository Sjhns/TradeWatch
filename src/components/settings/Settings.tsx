import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, BellIcon, MoonIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Navbar from '../Navbar';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  language: 'pt-BR';
  notifications: {
    email: boolean;
    desktop: boolean;
    alerts: boolean;
  };
}

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SettingsState>({
    theme: 'light',
    language: 'pt-BR',
    notifications: {
      email: true,
      desktop: true,
      alerts: true,
    },
  });

  const [loading, setLoading] = useState(false);

  const handleThemeChange = (theme: SettingsState['theme']) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const handleNotificationChange = (key: keyof SettingsState['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center pr-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Voltar para Home
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Configurações</h2>

              <div className="space-y-8">
                {/* Appearance */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <MoonIcon className="w-5 h-5 mr-2" />
                    Aparência
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 bg-indigo-100 text-indigo-700 ring-2 ring-indigo-600"
                    >
                      Claro
                    </button>
                    <button
                      disabled
                      className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      title="Em breve"
                    >
                      Escuro
                    </button>
                    <button
                      disabled
                      className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      title="Em breve"
                    >
                      Sistema
                    </button>
                  </div>
                </div>

                {/* Language */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <GlobeAltIcon className="w-5 h-5 mr-2" />
                    Idioma
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="px-4 py-3 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 flex items-center justify-between">
                      <span>Português (BR)</span>
                      <span className="text-xs text-gray-500">Único idioma disponível</span>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <BellIcon className="w-5 h-5 mr-2" />
                    Notificações
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'email', label: 'Notificações por Email' },
                      { key: 'desktop', label: 'Notificações Desktop' },
                      { key: 'alerts', label: 'Alertas de Preço' },
                    ].map(({ key, label }) => (
                      <label
                        key={key}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                      >
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.notifications[key as keyof SettingsState['notifications']]}
                          onClick={() => handleNotificationChange(key as keyof SettingsState['notifications'])}
                          className={`${
                            settings.notifications[key as keyof SettingsState['notifications']]
                              ? 'bg-indigo-600'
                              : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              settings.notifications[key as keyof SettingsState['notifications']]
                                ? 'translate-x-5'
                                : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-3 text-base border border-transparent rounded-lg shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
