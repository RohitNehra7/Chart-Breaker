"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const stocksApiRouter_1 = __importDefault(require("./routes/stocksApiRouter"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON bodies
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Allow requests from your React app
}));
// Serve the React app
app.use(express_1.default.static(path_1.default.join(__dirname, '../../stock-market-gpt/build')));
app.use('/api/nse', stocksApiRouter_1.default); // Register the stock-related routes
app.get('/api', (req, res) => {
    res.send(['Welcome to Stock APIs']);
});
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../stock-market-gpt/build', 'index.html'));
});
app.listen(config_1.PORT, () => {
    console.log(`Server is running on port ${config_1.PORT}`);
});
