const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
// Models
const Student = require("./models/studentModel");
const Address = require("./models/addressModel");

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

// Get address list
app.get("/address", async (req, res) => {
  let address;
  try {
    address = await Address.find().select("-__v");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "CANNOT find this address in the database",
    });
  }
  res.json(address);
});

// Get student list
app.get("/student", async (req, res) => {
  let student;
  try {
    student = await Student.find().select("-__v");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "CANNOT find this student in the database",
    });
  }
  res.json(student);
});

// Get student by id
app.get("/student/:studentId", async (req, res) => {
  let student;
  try {
    student = await Student.findById(req.params.studentId)
      .select("-__v")
      .populate("address");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "CANNOT find this student in the database",
    });
  }
  res.json(student);
});

// Create address
app.post("/address", async (req, res) => {
  let address;
  try {
    address = await Address.create(req.body);
  } catch (err) {
    return res.status(401).json({
      message: `ERROR: ${err}`,
    });
  }
  res.status(201).json({
    message: `Address ${req.body.streetNumber} ${req.body.streetName} created`,
    address,
  });
});

// Create student
app.post("/student", async (req, res) => {
  let student;
  try {
    student = await Student.create(req.body);
  } catch (err) {
    return res.status(401).json({
      message: `ERROR: ${err}`,
    });
  }
  res.status(201).json({
    message: `Student ${req.body.firstName} ${req.body.surname} created`,
  });
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("404: Page not found");
});

// Listen
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
