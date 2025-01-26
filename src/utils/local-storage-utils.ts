import { Asset, Alert } from "../types";

const ASSETS_KEY = "assets";
const ALERTS_KEY = "alerts";

export const saveAssetsToLocalStorage = (assets: Asset[]) => {
  localStorage.setItem(ASSETS_KEY, JSON.stringify(assets));
};

export const getAssetsFromLocalStorage = (): Asset[] => {
  const assetsJson = localStorage.getItem(ASSETS_KEY);
  return assetsJson ? JSON.parse(assetsJson) : [];
};

export const saveAlertsToLocalStorage = (alerts: Alert[]) => {
  localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
};

export const getAlertsFromLocalStorage = (): Alert[] => {
  const alertsJson = localStorage.getItem(ALERTS_KEY);
  return alertsJson ? JSON.parse(alertsJson) : [];
};
