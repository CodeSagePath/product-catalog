import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3344;

mongoose.connect("mongodb://127.0.0.1/product-catalog")
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err.message);
  });

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Product Catalog API" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
});
