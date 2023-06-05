import express from 'express';
import dotenv from 'dotenv';

const app = express();
const port = 5000;
dotenv.config();

app.get('/', (_, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
