import mongoose from "mongoose";

const configureDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/product-catalog");
    console.log("Successfully connected to MongoDB", db.connections[0].name);
  } catch (err) {
    console.log("Error connecting to MongoDB", err.message);
  }
};

export default configureDB;
