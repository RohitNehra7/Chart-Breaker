import { Request, Response } from 'express';
import { fetchAutoCompleteResults, fetchDeliverableQuantities, fetchIndicesList, fetchStockInfo, fetchStockList } from '../services/stockService';
import { ApiResponse } from './apiResponse';
import { StockMetadata, StockSymbolData } from '../interfaces/equityData.interface';
import { MarketIndexData } from '../interfaces/marketIndex.interface';
import { DeliverableData, DeliverableMetaData } from '../interfaces/historicalData.interface';

// Get stock list
export const getStockList = async (req: Request, res: Response) => {
  try {
    const stockList = await fetchStockList();
    const response: ApiResponse<StockMetadata[]> = {
      success: true,
      data: stockList
    }
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
      data: indicesList
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch indices list' });
  }
};

export const getAutoComplete = async (req: Request, res: Response) => {
  const { query } = req.query;
  try {
    const indicesList = await fetchAutoCompleteResults(query as string);
    const response: ApiResponse<StockSymbolData[]> = {
      success: true,
      data: indicesList
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch indices list' });
  }
}

export const getDeliverableQuantities = async (req: Request, res: Response) => {
  const { from, to, symbol } = req.query;
  try {
    const deliverableQuantityData = await fetchDeliverableQuantities(from as string, to as string, symbol as string);
    const response: ApiResponse<{data: DeliverableData[], metaData: DeliverableMetaData}> = {
      success: true,
      data: deliverableQuantityData
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deliverable quantity' });
  }
}

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
