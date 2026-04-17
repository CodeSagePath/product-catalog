// use es6 module loader

// enable cors

import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3344;

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Product Catalog API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});