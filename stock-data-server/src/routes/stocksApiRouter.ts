import { Router } from 'express';
import { getAllIndicesList, getStockInfo, getStockList } from '../controllers/stockController';

const router = Router();

router.get('/allStocklist', getStockList);
router.get('/allIndicesList', getAllIndicesList);
router.get('/stock/:symbol', getStockInfo);

export default router;
