import express, { Application, Request, Response } from 'express';
import { PORT } from './config';
import stockRoutes from './routes/stocksApiRouter';

const app: Application = express();
app.use(express.json());  // Middleware to parse JSON bodies
app.use('/api/nse', stockRoutes);  // Register the stock-related routes

app.get('/api', (req: Request, res: Response) => {
  res.send(['Welcome to Stock APIs']);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
