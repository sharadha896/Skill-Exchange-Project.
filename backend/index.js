const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/skillDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Import User model
const User = require("./models/User");


// 🔹 Register API
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🔥 NEW: Get All Users API
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🔹 Test API
app.get("/", (req, res) => {
  res.send("API Working");
});


// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});