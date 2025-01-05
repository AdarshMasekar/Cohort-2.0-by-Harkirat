// Importing necessary modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()

// Getting environment variables
const secret = parseInt(process.env.BCRYPT_SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

// Function to hash a password
const hash = async(passsword) =>{
    return await bcrypt.hash(passsword,secret);
}

// Function to compare a password with a hashed password
const compare = async(passsword,hashedPassword) =>{
    return await bcrypt.compare(passsword,hashedPassword);
}

// Function to generate a JWT token
const generateToken = (username) =>{
    return jwt.sign({username:username},JWT_SECRET,{expiresIn:'12h'})
}

// Function to verify a JWT token
const verifyToken = (token) =>{
    const originalToken = token.split(" ")[1];
    return jwt.verify(originalToken,JWT_SECRET);
}

// Exporting the functions
module.exports = {
    hash,
    compare,
    generateToken,
    verifyToken
}
