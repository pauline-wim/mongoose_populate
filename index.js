const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

// Connexion to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongoDB"));

// Middlewares
app.use(express.json());

// ROUTES

app.get("/", (req, res) => {
  res.send("Hello World !");
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("404: Page not found");
});

// Listen
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
