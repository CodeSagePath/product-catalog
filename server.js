import express from "express";
import cors from "cors";

// create an instance of express
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// import the Product model
import Product from "./models/product.js";

// import error formatter
import errorsFormatter from "./helpers/errorsFormatter.js";

// import DB configuration
import configureDB from "./config/configureDB.js";
// connect to the database - function call
configureDB();

// define the port number
const PORT = 3344;

// GET / - welcome message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Product Catalog API" });
});

// GET all products - return all the products
// Updated to use async/await instead of .then() and .catch()
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }

  // Product.find()
  //   .then((products) => {
  //     // res.json(products);

  //     // return the response in the following format
  //     /**
  //      {
  //         count: 2,
  //         data: [ {}, {} ]
  //      }
  //     */

  //     res.json({ count: products.length, data: products });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ error: "Something went wrong" });
  //   });
});

// GET /products/:id - return a single product by id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      if (!product) { // record (Product) not found
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
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

// DELETE /products/:id - delete a product by id
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) { // record (Product) not found
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }

  // const { id } = req.params;

  // Product.findByIdAndDelete(id)
  //   .then((product) => {
  //     if (!product) { // record (Product) not found
  //       return res.status(404).json({ error: "Product not found" });
  //     }

  //     // return res.status(204).json(); // no content
  //     res.json(product);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ error: "Something went wrong" });
  //   });
});

// Update a product by id - PUT /products/:id
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  Product.findByIdAndUpdate(id, { name, price }, { new: true, runValidators: true })
    .then((product) => {
      if (!product) { // record (Product) not found
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        const errMessages = errorsFormatter(err.errors);
        return res.status(400).json(errMessages);
      }
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

// POST request where frontend/postman sends an object of values : { values = "10, 20, 30" } expected output - { sum : 60 } 
app.post("/sum", (req, res) => {

  const { values } = req.body;
  const valuesArray = values.split(","); // ["10", "20", "30"]

  const numbersArray = valuesArray.map(ele => {
    return Number(ele.trim());
  }); // [10, 20, 30]

  const sum = numbersArray.reduce((acc, ele) => {
    return acc + ele;
  }, 0);

  res.status(200).json({ sum });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
});
