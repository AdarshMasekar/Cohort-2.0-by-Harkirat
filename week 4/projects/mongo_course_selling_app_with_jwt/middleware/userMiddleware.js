// Importing necessary modules
const { User } = require("../db"); // Importing User model from the database
const { userValidator } = require("../validation/index"); // Importing user validation function
const {hash,compare} = require("../auth/index") // Importing hash and compare functions for password handling

// Middleware function to handle user authentication
async function userMiddleware(req,res,next){
    // Extracting username and password from the request body
    const username = req.body.username;
    const password = req.body.password;
    // Hashing the password for storage or comparison
    const hashedPassword = await hash(password);
    // Validating user input
    const isValidInput = userValidator({username,password});
    // If input validation fails, return an error response
    if(!isValidInput.success){
        return res.status(400).json({error:isValidInput.error.issues.map(issue =>issue.message).join(" and ")});
    }
    // Checking if a user with the given username already exists
    const userExists = await User.findOne({username:username});
    // Storing username, password, and hashed password in the request object
    req.username = username;
    req.passsword = password;
    req.hashedPassword = hashedPassword;

    // Handling different routes based on the original URL
    if(req.originalUrl === '/user/signup'){
        // If the user is trying to sign up and already exists, return an error
        if(userExists){
            return res.status(400).json({error:"user is already registered!"})
        }
        // If the user does not exist, proceed with the sign up process
        next();
    }else if(req.originalUrl==='/user/signin'){
        // If the user is trying to sign in and does not exist, return an error
        if(!userExists){
            return res.status(400).json({error:"user not found!"})
        }
        // Comparing the provided password with the stored hashed password
        const isValidCreadentials = await compare(password,hashedPassword);
        // If the credentials are invalid, return an error
        if(!isValidCreadentials){
            return res.status(400).json("incorrect passsword!")
        }
        // If credentials are valid, proceed with the sign in process
        next();
    }
}

// Exporting the middleware function
module.exports = userMiddleware;
