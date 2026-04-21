// models/product.js

import mongoose from "mongoose";

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

export default Product;
