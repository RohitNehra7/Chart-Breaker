import { Router } from 'express';
import { getAllIndicesList, getAutoComplete, getDeliverableQuantities, getStockInfo, getStockList } from '../controllers/stockApiController';

const router = Router();

router.get('/allStocklist', getStockList);
router.get('/allIndicesList', getAllIndicesList);
router.get('/autoComplete', getAutoComplete)
router.get('/historical/deliverableQuantity', getDeliverableQuantities)

export default router;
