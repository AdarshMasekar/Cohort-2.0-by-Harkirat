// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Initializing the Express application
const app = express();
const port = 3000;
app.use(express.json()); // Middleware to parse JSON requests

// Setting up rate limiting to prevent abuse
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 10, // Limit each IP to 10 requests per windowMs
    message: { msg: "Too many requests, please try again later." }
});

app.use(limiter); // Applying the rate limit middleware

// Connecting to MongoDB
mongoose.connect("mongodb+srv://adarsh:<your password>@cluster0.eowltwt.mongodb.net/Authentication").then(() => {
    console.log("Database connected successfully!");
}).catch(err => {
    console.log("Database connection error: ", err);
});

// Defining the user schema
const userSchema = mongoose.Schema({
    username: String,
    password: String
});

const saltRounds = 10; // Number of salt rounds for hashing

const user = mongoose.model("user", userSchema); // User model

// Middleware for user verification during login
async function userMiddleware(req, res, next) {
    const username = req.headers.username; // Extracting username from headers
    const password = req.headers.password; // Extracting password from headers

    const findUser = await user.findOne({ username: username }); // Finding user in the database
    if (findUser == null) {
        res.status(404).json({ "msg": "User not found!" }); // User not found response
        return;
    }
    let hashedPassword = findUser.password; // Retrieving hashed password
    let passwordCheck = await bcrypt.compare(password, hashedPassword); // Comparing passwords

    if (!passwordCheck) {
        res.status(401).json({ "msg": "Credentials are wrong!" }); // Invalid credentials response
        return;
    } else {
        next(); // Proceed to the next middleware if credentials are valid
    }
}

// Registration endpoint for new users
app.post("/user", async (req, res) => {
    try {
        let username = req.body.username; // Getting username from request body
        let password = req.body.password; // Getting password from request body
        const salt = await bcrypt.genSalt(saltRounds); // Generating salt
        let hashedPassword = await bcrypt.hash(password, salt); // Hashing the password
        console.log(hashedPassword); // Logging hashed password
        const newUser = new user({
            username: username,
            password: hashedPassword // Storing hashed password
        });
        await newUser.save(); // Saving new user to the database
        res.status(201).json({ "msg": "User registration successful!" }); // Success response
    } catch (err) {
        console.log({ "err": err }); // Logging error
        res.status(500).json({ "msg": "Registration failed!" }); // Failure response
    }
});

// Home route with user verification
app.get("/", userMiddleware, (req, res) => {
    console.log("Welcome to home page!"); // Logging access to home page
    res.status(200).json({ 'msg': "Authenticated user logged in!" }); // Success response for authenticated user
});


// global catches
app.use(function(err,req,res,next){
    res.json({msg:"something went wrong with the server!"})
})

// Starting the server
app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`); // Logging server start
});
