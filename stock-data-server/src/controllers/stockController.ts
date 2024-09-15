import { Request, Response } from 'express';
import { fetchStockInfo, fetchStockList } from '../services/stockService';

// Get stock list
export const getStockList = async (req: Request, res: Response) => {
  try {
    const stockList = await fetchStockList();
    res.json(stockList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock list' });
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
