import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Auth from "./components/auth/Auth";
import Dashboard from "./components/Dashboard";
import Profile from "./components/profile/Profile";
import AddAssetModal from "./components/AddAssetModal";
import Settings from "./components/settings/Settings";
import { Asset, Alert, AssetFilter } from "./types";
import { mockAssets, mockAlerts } from "./data/mockData";

import Navbar from "./components/Navbar";
import {
  getAlertsFromLocalStorage,
  getAssetsFromLocalStorage,
  saveAlertsToLocalStorage,
  saveAssetsToLocalStorage,
} from "./utils/local-storage-utils";

function AppContent() {
  const { signIn, signUp, user } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<AssetFilter>({
    type: "all",
    sortBy: "name",
    order: "asc",
  });

  useEffect(() => {
    // somente se tiver vazio
    const savedAssets = getAssetsFromLocalStorage();
    const savedAlerts = getAlertsFromLocalStorage();

    if (savedAssets.length === 0) {
      saveAssetsToLocalStorage(mockAssets);
    }

    if (savedAlerts.length === 0) {
      saveAlertsToLocalStorage(mockAlerts);
    }
  }, []);

  useEffect(() => {
    const savedAssets = getAssetsFromLocalStorage();
    const savedAlerts = getAlertsFromLocalStorage();
    setAlerts(
      savedAlerts.map((alert) => ({
        ...alert,
        timestamp: new Date(alert.timestamp),
      }))
    );
    setAssets(
      savedAssets.map((asset) => ({
        ...asset,
        lastUpdate: new Date(asset.lastUpdate),
      }))
    );
  }, []);

  const handleAddAsset = (newAsset: {
    type: "stock" | "fii";
    ticker: string;
    quantity: number;
    price: number;
  }) => {
    const asset: Asset = {
      ...newAsset,
      id: Date.now().toString(),
      name: newAsset.ticker, // Using ticker as name for now
      change: 0, // Initialize change as 0
      lastUpdate: new Date(),
      sector: undefined,
      monthlyChange: 0,
      yearlyChange: 0,
      lastDividend: 0,
      dividendYield: 0,
      historicalPrices: [],
      symbol: "",
      volume: 0,
    };
    setAssets([...assets, asset]);

    // Add success alert
    const alert: Alert = {
      id: Date.now().toString(),
      ticker: asset.ticker,
      message: `${asset.ticker} adicionado com sucesso`,
      type: "success",
      timestamp: new Date(),
    };

    setAlerts([alert, ...alerts]);
    saveAssetsToLocalStorage([...assets, asset]);
    saveAlertsToLocalStorage([...alerts, alert]);
  };

  const handleFilterChange = (newFilter: Partial<AssetFilter>) => {
    setFilter({ ...filter, ...newFilter });
  };

  const filteredAssets = assets
    .filter((asset) =>
      filter.type === "all" ? true : asset.type === filter.type
    )
    .sort((a, b) => {
      const order = filter.order === "asc" ? 1 : -1;
      switch (filter.sortBy) {
        case "name":
          return order * a.name.localeCompare(b.name);
        case "price":
          return order * (a.price - b.price);
        case "change":
          return order * (a.change - b.change);
        default:
          return 0;
      }
    });

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <Auth
              onLogin={signIn}
              onRegister={signUp}
              onForgotPassword={(email) =>
                Promise.resolve(console.log("Reset password for:", email))
              }
            />
          )
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
              {/* Navbar */}
              <Navbar alerts={alerts} />
              {/* Main Content */}
              <Dashboard
                assets={filteredAssets}
                filter={filter}
                onFilterChange={handleFilterChange}
                onAddAsset={() => setIsModalOpen(true)}
              />
              <AddAssetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddAsset}
              />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Navbar alerts={alerts} />
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Navbar alerts={alerts} />
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
