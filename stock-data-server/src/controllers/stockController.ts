import { Request, Response } from 'express';
import {
  fetchIndicesList,
  fetchStockInfo,
  fetchStockList,
} from '../services/stockService';
import { ApiResponse } from './apiResponse';
import { StockMetadata } from '../interfaces/equityData.interface';
import { MarketIndexData } from '../interfaces/marketIndex.interface';

// Get stock list
export const getStockList = async (req: Request, res: Response) => {
  try {
    const stockList = await fetchStockList();
    const response: ApiResponse<StockMetadata[]> = {
      success: true,
      data: stockList,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock list' });
  }
};

export const getAllIndicesList = async (req: Request, res: Response) => {
  try {
    const indicesList = await fetchIndicesList();
    const response: ApiResponse<MarketIndexData[]> = {
      success: true,
      data: indicesList,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch indices list' });
  }
};

// Get specific stock info
export const getStockInfo = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  try {
    const stockInfo = await fetchStockInfo(symbol);
    res.json(stockInfo);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch info for stock ${symbol}` });
  }
};
