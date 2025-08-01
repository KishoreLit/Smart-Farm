const express = require("express");
const dotEnv = require("dotenv");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
dotEnv.config();

let db;

// 🟢 Set login.html as the default landing page (BEFORE static middleware)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// 🔗 Connect to MongoDB
MongoClient.connect(process.env.MONGO_URI)
  .then((client) => {
    console.log("✅ MongoDB Connected Successfully");
    db = client.db("ProjectX"); // ✅ FIXED: Use your DB name here, not the full URI
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error);
  });

// 🔐 Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    await db.collection("users").insertOne({ name, email, password });
    res.status(200).json({ success: true, message: "Signup successful" });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ success: false, message: "Signup failed. Try again." });
  }
});

// login route
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Email not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ success: false, message: "Login failed. Try again." });
  }
});


// ✉️ Contact Form Submission
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.send(`<script>alert('Please fill all required fields.'); window.history.back();</script>`);
    }

    await db.collection("contacts").insertOne({
      name,
      email,
      message,
      date: new Date()
    });

    res.send(`<script>alert('Message sent successfully!'); window.location.href='/';</script>`);
  } catch (error) {
    console.error("❌ Contact form error:", error);
    res.send(`<script>alert('Failed to send message. Please try again.'); window.history.back();</script>`);
  }
});

// 👨‍💼 Admin Panel Page
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// 👨‍💼 Admin - View Messages API
app.get("/admin/messages", async (req, res) => {
  try {
    const messages = await db.collection("contacts")
      .find({})
      .sort({ date: -1 })
      .toArray();
    res.json(messages);
  } catch (error) {
    console.error("❌ Admin fetch error:", error);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

// 🚀 Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Started at http://localhost:${PORT}`);
});
