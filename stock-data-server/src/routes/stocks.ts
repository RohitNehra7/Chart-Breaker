import { Router } from 'express';
import { getStockInfo, getStockList } from '../controllers/stockController';

const router = Router();

router.get('/api/list', getStockList); // Example route to get stock list
router.get('/api/:symbol', getStockInfo); // Example route to get info on a specific stock

export default router;
