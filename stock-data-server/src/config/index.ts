import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const NSE_API_URL = process.env.NSE_API_URL || 'https://www.nseindia.com';
