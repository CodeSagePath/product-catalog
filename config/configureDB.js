import mongoose from "mongoose";

const configureDB = () => { 
  mongoose.connect("mongodb://127.0.0.1/product-catalog")
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.error("Could not connect to MongoDB", err.message);
    });
};

export default configureDB;
