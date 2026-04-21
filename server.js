import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// create an instance of express
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// import error formatter
import errorsFormatter from "./helpers/errorsFormatter.js";

// import DB configuration
import configureDB from "./config/configureDB.js";
// connect to the database - function call
configureDB();

// define the port number
const PORT = 3344;

// Define a schema - design / blueprint (object structure)
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name should not be empty"],
    minLength: 5,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price should be minimum 1"],
  }
}, {
  timestamps: true, // createdAt, updatedAt
});

// Create a model - collection (table) in the database
const Product = mongoose.model("Product", productSchema);

// GET / - welcome message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Product Catalog API" });
});

// GET all products - return all teh products
app.get("/products", (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

// POST /create-product - create a new product
app.post("/create-product", (req, res) => {
  const { name, price } = req.body;

  const newProduct = new Product();
  newProduct.name = name;
  newProduct.price = price;

  newProduct.save()
    .then((savedProduct) => {
      res.status(201).json(savedProduct);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
});
