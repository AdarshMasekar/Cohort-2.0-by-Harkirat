// week 3/exercises/userRoleBasedAccessMiddleware.js
const express = require("express");
const mongoose = require("mongoose");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const port = 3000;

// Database connection
mongoose.connect("mongodb+srv://adarsh:Krishna55555@cluster0.eowltwt.mongodb.net/RoleBasedAccess")
  .then(() => {
    console.log("database connection successfull!");
  })
  .catch((err) => {
    console.log("database connection failed!", err);
  });

// User schema for MongoDB
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "editor", "viewer"], required: true },
});

const User = mongoose.model("user", userSchema);

// Zod schema for user registration/login validation
const userSchemazod = z.object({
  username: z.string().min(3, "username must contain at least 3 letters"), // Corrected the message
  password: z.string().min(6, "password must contain at least 6 letters"), // Corrected the message
  role: z.enum(["admin", "editor", "viewer"]),
});

// Middleware to validate user input using Zod
function userSchemazodValidator(req, res, next) {
  let validationResult = userSchemazod.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      err: validationResult.error.issues.map((issue) => issue.message).join(" and "),
    });
  }
  next();
}

// Middleware to validate user credentials
async function userCredentialsValidator(req, res, next) {
  try {
    const userExists = await User.findOne({ username: req.body.username });
    if (!userExists) {
      return res.status(404).json({ message: "User not found!" }); // Improved message
    }
    // Compare hashed passwords
    const isMatch = await bcrypt.compare(req.body.password, userExists.password);
    if (isMatch) {
      next();
    } else {
      return res.status(401).json({ message: "Incorrect password!" }); // Improved message
    }
  } catch (error) {
    console.error("Error validating credentials:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Middleware to validate user access based on JWT token
function accessValidator(req, res, next) {
  let token = req.headers.jwttoken;
  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }
  try {
    const decoded = jwt.verify(token, "secretkey");
    if (decoded) {
      let role = decoded.role;
      // Route-specific access control
      if (req.originalUrl.match(/^\/articles(\/)?$/)) {
        if (role === "admin" || role === "editor") {
          next();
        } else {
          return res.status(403).json({ err: "You do not have access to this page!" }); // Improved message
        }
      } else if (req.originalUrl.match(/^\/admin\/dashboard$/)) {
        if (role === "admin") {
          next();
        } else {
          return res.status(403).json({ err: "You do not have access to this page!" }); // Improved message
        }
      } else {
        return res.status(403).json({ err: "You do not have access to this page!" }); // Handle cases where no route matches
      }
    } else {
      return res.status(403).json({ err: "You do not have access to this page!" }); // Handle cases where decoding fails
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Login route
app.post(
  "/login",
  userSchemazodValidator,
  userCredentialsValidator,
  async (req, res) => {
    let userExists = await User.findOne({ username: req.body.username });
    let expiresIn = "1h";
    let jwttoken = jwt.sign(
      { username: userExists.username, role: userExists.role },
      "secretkey",
      { expiresIn }
    );
    res.status(200).json({
      message: "Login successful, JWT token created:",
      jwttoken,
    });
  }
);

// Register route
app.post(
  "/register",
  userSchemazodValidator,
  async (req, res) => {
    let salt = 10;
    let newUser = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, salt),
      role: req.body.role,
    });
    try {
      await newUser.save();
      res.status(201).json({
        message: `${req.body.username} registered successfully!`,
      });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Article route
app.get("/articles", accessValidator, (req, res) => {
  res.json("Welcome to the articles page");
});

// Admin dashboard route
app.get("/admin/dashboard", accessValidator, (req, res) => {
  res.json("Welcome to the admin dashboard");
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    console.error("Error:", err); // Log the error for debugging
    res.status(500).json({ message: "Something went wrong. Please try again later." }); // More informative message
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
