import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileUpdateData, TradingExperience } from "../../types/profile";
import {
  UserCircleIcon,
  ArrowLeftIcon,
  CameraIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";

const TRADING_EXPERIENCE_OPTIONS: {
  value: TradingExperience;
  label: string;
}[] = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
  { value: "professional", label: "Profissional" },
];

const MARKET_OPTIONS = [
  "Ações",
  "Criptomoedas",
  "Forex",
  "Commodities",
  "Fundos",
  "Renda Fixa",
];

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    {/* Header Skeleton */}
    <div className="relative h-48 bg-gradient-to-r from-blue-400 to-indigo-400">
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-32 rounded-full bg-gray-300" />
      </div>
    </div>

    <div className="pt-24 pb-8 px-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Basic Information Skeleton */}
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
                <div className="h-12 bg-gray-200 rounded-lg w-full" />
              </div>
            ))}
          </div>

          {/* Markets and Notifications Skeleton */}
          <div className="space-y-4">
            <div>
              <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
              <div className="grid grid-cols-2 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded-lg" />
                ))}
              </div>
            </div>

            <div>
              <div className="h-4 w-28 bg-gray-300 rounded mb-2" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="h-5 w-5 bg-gray-300 rounded" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SaveFeedback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 shadow-xl transform transition-all scale-100 animate-bounce">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 mb-4">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-lg font-medium text-gray-900">
          Salvando alterações...
        </p>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProfileUpdateData>({
    name: "",
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
  });

  useEffect(() => {
    // Load profile data from localStorage or auth context
    const savedProfile = localStorage.getItem("userProfile");
    const savedImage = localStorage.getItem("profileImage");

    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    } else if (profile) {
      const newFormData = {
        name: profile.name || "",
        phone: profile.phone || "",
        occupation: profile.occupation || "",
        tradingExperience: profile.tradingExperience || "beginner",
        preferredMarkets: profile.preferredMarkets || [],
        notifications: profile.notifications || {
          email: true,
          push: true,
          priceAlerts: true,
          newsAlerts: false,
          marketUpdates: true,
        },
      };
      setFormData(newFormData);
      localStorage.setItem("userProfile", JSON.stringify(newFormData));
    }

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [profile]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem("profileImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      await updateProfile(formData);
      localStorage.setItem("userProfile", JSON.stringify(formData));
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checkbox.checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMarketToggle = (market: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredMarkets: (prev.preferredMarkets || []).includes(market)
        ? (prev.preferredMarkets || []).filter((m) => m !== market)
        : [...(prev.preferredMarkets || []), market],
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 3000);

    setAuthLoading(true);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center pr-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Voltar para Home
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {authLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {/* Profile Header */}
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                      ) : (
                        <UserCircleIcon className="w-32 h-32 text-white" />
                      )}
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <CameraIcon className="w-5 h-5 text-gray-600" />
                        <input
                          type="file"
                          id="profile-image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="pt-24 pb-8 px-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                        <p className="text-red-700">{error}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 transition-colors duration-200"
                            placeholder="Digite seu nome"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 transition-colors duration-200"
                            placeholder="(00) 00000-0000"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profissão
                          </label>
                          <input
                            type="text"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 transition-colors duration-200"
                            placeholder="Digite sua profissão"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Experiência em Trading
                          </label>
                          <div className="relative">
                            <select
                              name="tradingExperience"
                              value={formData.tradingExperience}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1 block w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 transition-colors duration-200 appearance-none"
                            >
                              {TRADING_EXPERIENCE_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Markets and Notifications */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mercados Preferidos
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {MARKET_OPTIONS.map((market) => (
                              <label
                                key={market}
                                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                  formData.preferredMarkets.includes(market)
                                    ? "bg-indigo-100 text-indigo-800 shadow-sm"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                } ${
                                  !isEditing && "pointer-events-none opacity-75"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.preferredMarkets.includes(
                                    market
                                  )}
                                  onChange={() => handleMarketToggle(market)}
                                  disabled={!isEditing}
                                  className="hidden"
                                />
                                <span className="text-sm">{market}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notificações
                          </label>
                          <div className="space-y-2">
                            {Object.entries(formData.notifications).map(
                              ([key, value]) => (
                                <label
                                  key={key}
                                  className="flex items-center space-x-3 text-gray-700"
                                >
                                  <input
                                    type="checkbox"
                                    name={key}
                                    checked={value}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all duration-200"
                                  />
                                  <span className="text-sm capitalize">
                                    {key === "email" &&
                                      "Notificações por Email"}
                                    {key === "push" && "Notificações Push"}
                                    {key === "priceAlerts" &&
                                      "Alertas de Preço"}
                                    {key === "newsAlerts" &&
                                      "Alertas de Notícias"}
                                    {key === "marketUpdates" &&
                                      "Atualizações de Mercado"}
                                  </span>
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-3 text-base border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 text-base border border-transparent rounded-lg shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            {loading ? "Salvando..." : "Salvar"}
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="px-6 py-3 text-base border border-transparent rounded-lg shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                        >
                          Editar Perfil
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {loading && <SaveFeedback />}
    </>
  );
};

export default Profile;
