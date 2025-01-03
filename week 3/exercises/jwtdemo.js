// Import necessary libraries
const express = require("express"); // Web framework for Node.js
const jwt = require("jsonwebtoken"); // Library for JSON Web Token
const z = require("zod"); // Schema validation library
const mongoose = require("mongoose"); // MongoDB object modeling tool
const bcrypt = require("bcrypt"); // Library for hashing passwords

// Define user schema using Zod for validation
const userSchema = z.object({
    username: z.string().min(1), // Username must be a non-empty string
    password: z.string().min(8) // Password must be at least 8 characters long
});

// Connect to MongoDB database
mongoose.connect("mongodb+srv://adarsh:<your password>@cluster0.eowltwt.mongodb.net/JWT").then(() => {
    console.log("connect to db successfully"); // Log successful connection
});

// Define Mongoose schema for user
const userScemadb = mongoose.Schema(
    {
        username: String, // User's username
        password: String, // User's hashed password
    }
);
const user = mongoose.model("user", userScemadb); // Create user model

const port = 3000; // Define server port

const app = express(); // Initialize Express app
app.use(express.json()); // Middleware to parse JSON requests

// Middleware to validate JWT token
async function validateToken(req, res, next) {
    const jwttoken = req.headers.jwttoken; // Get token from request headers

    // Verify the token
    if (!jwt.verify(jwttoken, "adarshmasekar")) {
        res.json({ "err": "invalid credentials!" }); // Respond with error if invalid
    } else {
        next(); // Proceed to the next middleware if valid
    }
}

// Route to get all users
app.get("/users", validateToken, async (req, res) => {
    let users = await user.find(); // Fetch users from database
    if (!users) {
        res.status(404).json({ "err: ": "users not found!" }); // Respond with error if no users found
    } else {
        res.status(200).json(users); // Respond with users if found
    }
});

// Route for user sign-in
app.post("/register", async (req, res) => {
    let result = userSchema.safeParse(req.body); // Validate request body against schema
    if (!result.success) {
        res.status(400).json({ "msg": "unable to register!" }); // Respond with error if validation fails
    } else {
        let salt = 10;
        let newUser = new user({
            username: req.body.username, // Set username
            password: await bcrypt.hash(req.body.password, salt), // Hash password
        });
        newUser.save(); // Save new user to database
        res.status(200).json({ "msg": "user sign in successfull" }); // Respond with success message
    }
});

app.post("/login", async (req, res) => {
    let result = userSchema.safeParse(req.body); // Validate request body against schema
    let jwttoken; // Variable to hold JWT token
    if (!result.success) {
        res.status(400).json({ "msg": "unable to signin!" }); // Respond with error if validation fails
    } else {
        let userExists = await user.findOne({username:req.body.username});
        if(userExists){
            const expiresIn = '1h'; // Token expiration time
            jwttoken = jwt.sign({ username: req.body.username }, "adarshmasekar", { expiresIn }); // Create JWT token
            res.status(200).json(jwttoken); // Respond with success message
        }
        else{
            res.status(404).json({msg:"user not found!"})
        }
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({ "msg": "something went wrong with server!" }); // Respond with server error
    }
});

// Start the server
app.listen(port, (req, res) => {
    console.log(`server is running on port ${port}`); // Log server start
});
