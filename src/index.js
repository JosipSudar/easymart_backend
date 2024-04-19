const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const products = require("./routes/products");
const user = require("./routes/user");
const orders = require("./routes/orders");
const newsletter = require("./routes/newsletter");
const errorHanlderMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/auth");
require("dotenv").config();
require("http-status-codes");

app.use(express.json());

app.use(cors());

app.use("/api/products", products);
app.use("/api/user", user);
app.use("/api/orders", orders);
app.use("/api/newsletter", newsletter);

app.use(errorHanlderMiddleware); // Error handler middleware
app.use(authMiddleware); // Auth middleware

const port = process.env.port || 3000;

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
