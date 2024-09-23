export interface StockMetadata {
    symbol: string;
    identifier: string;
    purpose: string | null;
    lastPrice: number;
    change: number;
    pChange: number;
    previousClose: number;
    finalQuantity: number;
    totalTurnover: number;
    marketCap: string;  // Using string as it has a value of "-" in your data
    yearHigh: number;
    yearLow: number;
    iep: number;
    chartTodayPath: string;
}

export interface StockSymbolData {
    symbol: string;
    symbol_info: string;
    symbol_suggest: { input: string; weight: number }[];
    result_type: string;
    result_sub_type: string;
    activeSeries: string[];
    url: string;
  }