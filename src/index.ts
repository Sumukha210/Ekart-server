import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

const app = express();
const port = 5000;
dotenv.config();

app.use(express.static(path.join(__dirname, 'assets')));

console.log(path.join(__dirname, 'assets'));

app.get('/', (_, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
