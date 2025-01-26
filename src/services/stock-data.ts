export interface ApiServiceOptions {
  range?: string;
  interval?: string;
  fundamental?: boolean;
  dividends?: boolean;
  modules?: string;
}

export type Response = {
  results: Array<{
    currency: string;
    shortName: string;
    longName: string;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketTime: string;
    regularMarketPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayRange: string;
    regularMarketDayLow: number;
    regularMarketVolume: number;
    regularMarketPreviousClose: number;
    regularMarketOpen: number;
    fiftyTwoWeekRange: string;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    symbol: string;
    priceEarnings: number;
    earningsPerShare: number;
    logourl: string;
  }>;
  requestedAt: string;
  took: string;
};

export const fetchStockData = async (
  symbols: string[],
  options: ApiServiceOptions
): Promise<Response> => {
  const baseUrl = process.env.REACT_APP_BRAPI_URL as string;

  const queryParams = new URLSearchParams({
    range: options.range ?? "1d",
    interval: options.interval ?? "1d",
    fundamental: options.fundamental?.toString() ?? "false",
    dividends: options.dividends?.toString() ?? "false",
    modules: options.modules ?? "",
    token: process.env.REACT_APP_API_KEY as string,
  });

  const url = `${baseUrl}/${symbols.join(",")}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};
