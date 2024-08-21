import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import auth from "./routes/auth.mjs";
import review from "./routes/review.mjs";
import product from "./routes/product.mjs";
import order from "./routes/order.mjs";
import cart from "./routes/cart.mjs";
import hero from "./routes/hero.mjs";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

// Increase the limit for JSON payloads
app.use(express.json({ limit: "50mb" }));

// Increase the limit for URL-encoded payloads
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/review", review);
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/cart", cart);
app.use("/api/hero", hero);

app.listen(5000, () => {
  console.log("Backend is running");
});
