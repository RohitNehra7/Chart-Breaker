"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockInfo = exports.getAllIndicesList = exports.getStockList = void 0;
const stockService_1 = require("../services/stockService");
// Get stock list
const getStockList = async (req, res) => {
    try {
        const stockList = await (0, stockService_1.fetchStockList)();
        const response = {
            success: true,
            data: stockList,
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock list' });
    }
};
exports.getStockList = getStockList;
const getAllIndicesList = async (req, res) => {
    try {
        const indicesList = await (0, stockService_1.fetchIndicesList)();
        const response = {
            success: true,
            data: indicesList,
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch indices list' });
    }
};
exports.getAllIndicesList = getAllIndicesList;
// Get specific stock info
const getStockInfo = async (req, res) => {
    const { symbol } = req.params;
    try {
        const stockInfo = await (0, stockService_1.fetchStockInfo)(symbol);
        res.json(stockInfo);
    }
    catch (error) {
        res.status(500).json({ error: `Failed to fetch info for stock ${symbol}` });
    }
};
exports.getStockInfo = getStockInfo;
