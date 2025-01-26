export interface Asset {
  sector: any;
  monthlyChange: number;
  yearlyChange: number;
  lastDividend: number;
  dividendYield: number;
  historicalPrices: never[];
  symbol:   string;
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  type: string;
  volume: number;
  lastUpdate: Date;
}

export interface Alert {
  id: string;
  ticker: string;
  message: string;
  type: 'success' | 'error';
  timestamp: Date;
}

export interface AssetFilter {
  type: 'all' | 'stock' | 'fii';
  sortBy: 'name' | 'price' | 'change';
  order: 'asc' | 'desc';
}
