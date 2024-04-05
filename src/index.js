const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const products = require("./routes/products");
require("dotenv").config();

app.use(express.json());

app.use("/api/products", products);

const port = process.env.port || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
