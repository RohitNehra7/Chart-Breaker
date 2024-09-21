// src/services/stockService.ts
import axios from 'axios';
import { ApiResponse } from '../interfaces/apiResponse';
import { StockMetadata } from '../interfaces/equityData.interface';
import { MarketIndexData } from '../interfaces/marketIndex.interface';

export const fetchAllStockList = async (): Promise<StockMetadata[]> => {
  try {
    const response = await axios.get<ApiResponse<StockMetadata[]>>('/api/nse/allStockList');
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch all stock list');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllIndicesList = async (): Promise<MarketIndexData[]> => {
  try {
    const response = await axios.get<ApiResponse<MarketIndexData[]>>('/api/nse/allIndicesList');
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch indices list');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
