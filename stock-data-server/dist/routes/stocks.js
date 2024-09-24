"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockController_1 = require("../controllers/stockController");
const router = (0, express_1.Router)();
router.get('/api/list', stockController_1.getStockList); // Example route to get stock list
router.get('/api/:symbol', stockController_1.getStockInfo); // Example route to get info on a specific stock
exports.default = router;
