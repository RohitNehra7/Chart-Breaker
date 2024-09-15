import express, { Request, Response } from 'express';
import { PORT } from './config';
import stockRoutes from './routes/stocks';

const app = express();

app.use(express.json());  // Middleware to parse JSON bodies
app.use('/api/stocks', stockRoutes);  // Register the stock-related routes

app.get('/api', (req: Request, res: Response) => {
  res.send(['Welcome to Stock API']);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
