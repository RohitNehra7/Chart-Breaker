// src/services/stockService.ts
import axios from 'axios';
import { ApiResponse } from '../interfaces/apiResponse';
import { StockMetadata } from '../interfaces/equityData.interface';
import {
  MarketIndexData,
  StockSymbolData,
} from '../interfaces/marketIndex.interface';
import {
  DeliverableData,
  DeliverableMetaData,
} from '../interfaces/historicalDataInterface';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchAllStockList = async (): Promise<StockMetadata[]> => {
  try {
    const response = await axios.get<ApiResponse<StockMetadata[]>>(
      `${API_URL}/api/nse/allStockList`
    );
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
    const response = await axios.get<ApiResponse<MarketIndexData[]>>(
      `${API_URL}/api/nse/allIndicesList`
    );
    console.log(response);
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

export const fetchAutoCompleteResults = async (
  query: string
): Promise<StockSymbolData[]> => {
  try {
    const response = await axios.get<ApiResponse<StockSymbolData[]>>(
      `${API_URL}/api/nse/autoComplete?query=${query}`
    );
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

export const getDelivereableQuantityData = async (
  from: string,
  to: string,
  symbol: string
): Promise<{ data: DeliverableData[]; metaData: DeliverableMetaData }> => {
  try {
    const response = await axios.get<
      ApiResponse<{ data: DeliverableData[]; metaData: DeliverableMetaData }>
    >(
      `${API_URL}/api/nse//historical/deliverableQuantity?from=${from}&to=${to}&symbol=${symbol}`
    );
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
