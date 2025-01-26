import { Alert } from "../../types";

export const filterAlertsByTimeRange = (
  alerts: Alert[],
  timeRange: string
): Alert[] => {
  const now = new Date();
  const filteredAlerts = alerts.filter((alert) => {
    const alertDate = new Date(alert.timestamp);

    switch (timeRange) {
      case "1h":
        return now.getTime() - alertDate.getTime() <= 60 * 60 * 1000;
      case "24h":
        return now.getTime() - alertDate.getTime() <= 24 * 60 * 60 * 1000;
      case "7d":
        return now.getTime() - alertDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
      case "30d":
        return now.getTime() - alertDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
      case "all":
        return true;
      default:
        return true;
    }
  });

  return filteredAlerts.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
};
