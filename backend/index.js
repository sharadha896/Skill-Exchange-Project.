const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// uploads folder lekapothe create chestundi
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// uploaded videos ni browser lo play cheyyadaniki
app.use("/uploads", express.static("uploads"));

// MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/skillDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB error:", err.message));

const User = require("./models/User");
const Video = require("./models/Video");

// Multer setup (video file save cheyyadaniki)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Register
app.post("/register", async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      return res.status(400).json({ error: "Email already registered ❌" });
    }
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password ❌" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

// Add video (file upload, camera nundi tisina video)
app.post("/add-video", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file ❌" });
    }

    const video = new Video({
      title: req.body.title,
      url: `http://localhost:5000/uploads/${req.file.filename}`,
    });

    await video.save();
    res.json({ message: "Video added ✅", video });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// All videos
app.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// All users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Test
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});