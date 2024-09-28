"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStockInfo = void 0;
exports.fetchStockList = fetchStockList;
exports.fetchIndicesList = fetchIndicesList;
exports.fetchAutoCompleteResults = fetchAutoCompleteResults;
exports.fetchDeliverableQuantities = fetchDeliverableQuantities;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const nseHelper_1 = require("../nseHelper/nseHelper");
const nseIndia = new nseHelper_1.NseIndia();
// Fetch stock list from NSE API
async function fetchStockList() {
    const response = await nseIndia.getDataByEndpoint(nseHelper_1.ApiList.MARKET_DATA_PRE_OPEN);
    const stocksMetadata = response.data.map((stockData) => stockData === null || stockData === void 0 ? void 0 : stockData.metadata);
    return stocksMetadata;
}
async function fetchIndicesList() {
    const response = await nseIndia.getDataByEndpoint(nseHelper_1.ApiList.ALL_INDICES);
    const stocksMetadata = response === null || response === void 0 ? void 0 : response.data;
    return stocksMetadata;
}
async function fetchAutoCompleteResults(query) {
    const response = await nseIndia.getDataByEndpoint(`${nseHelper_1.ApiList.AUTOCOMPLETE}${query}`);
    const stockSymbolData = response === null || response === void 0 ? void 0 : response.symbols;
    return stockSymbolData;
}
async function fetchDeliverableQuantities(from, to, symbol) {
    const response = await nseIndia.getDataByEndpoint(`${nseHelper_1.ApiList.DELIVERABLE_QUANTITY}from=${from}&to=${to}&symbol=${symbol}`);
    return response;
}
// Fetch stock info from NSE API
const fetchStockInfo = async (symbol) => {
    const response = await axios_1.default.get(`${config_1.NSE_API_URL}/api/stock/${symbol}`);
    return response.data;
};
exports.fetchStockInfo = fetchStockInfo;
