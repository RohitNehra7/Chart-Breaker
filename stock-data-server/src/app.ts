import express, { Application, Request, Response } from 'express';
import { PORT } from './config';
import cors from 'cors';
import stockRoutes from './routes/stocksApiRouter';
import path from 'path';

const app: Application = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from your React app
  })
);

// Serve the React app
app.use(express.static(path.join(__dirname, '../../stock-market-gpt/build')));

app.use('/api/nse', stockRoutes); // Register the stock-related routes

app.get('/api', (req: Request, res: Response) => {
  res.send(['Welcome to Stock APIs']);
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, '../../stock-market-gpt/build', 'index.html')
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
