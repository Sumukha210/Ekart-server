import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { dbConnection } from './lib/dbConnection';
import productRoutes from './routes/Product.routes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'assets')));

dbConnection();

app.get('/', (_, res) => {
  const hello = 'Namaste';
  res.send('Hello, World!' + hello);
});

app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
