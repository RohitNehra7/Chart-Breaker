
import axios from 'axios';
import { NSE_API_URL } from '../config';

// Fetch stock list from NSE API
export const fetchStockList = async () => {
    console.log("inside the featch stock list service");
  const response = await axios.get(`${NSE_API_URL}/api/allIndices`);
  console.log(response);
  return response.data;
};

// Fetch stock info from NSE API
export const fetchStockInfo = async (symbol: string) => {
  const response = await axios.get(`${NSE_API_URL}/api/stock/${symbol}`);
  return response.data;
};
