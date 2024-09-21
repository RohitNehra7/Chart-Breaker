
import axios from 'axios';
import { NSE_API_URL } from '../config';
import { ApiList, NseIndia } from '../nseHelper/nseHelper';
import { StockMetadata } from '../interfaces/equityData.interface';
import { MarketIndexData } from '../interfaces/marketIndex.interface';

const nseIndia = new NseIndia();

// Fetch stock list from NSE API
export async function fetchStockList(): Promise<StockMetadata[]> {
  const response = await nseIndia.getDataByEndpoint(ApiList.MARKET_DATA_PRE_OPEN);
  const stocksMetadata: StockMetadata[] = response.data.map((stockData: {metadata: StockMetadata}) => stockData?.metadata);
  return stocksMetadata;
};

export async function fetchIndicesList(): Promise<MarketIndexData[]> {
  const response = await nseIndia.getDataByEndpoint(ApiList.ALL_INDICES);
  console.log(response);
  const stocksMetadata: MarketIndexData[] = response?.data;
  return stocksMetadata;
};

// Fetch stock info from NSE API
export const fetchStockInfo = async (symbol: string) => {
  const response = await axios.get(`${NSE_API_URL}/api/stock/${symbol}`);
  return response.data;
};
