// Importing necessary modules for database operations, validation, and authentication
const { Admin } = require("../db");
const { adminValidator } = require("../validation/index");
const {hash,compare} = require("../auth/index")

// Middleware function to handle admin authentication and registration
async function adminMiddleware(req,res,next){
    // Extracting username and password from request body
    const username = req.body.username;
    const password = req.body.password;
    // Hashing the password for registration or comparison
    const hashedPassword = await hash(password);
    // Validating the input data
    const isValidInput = adminValidator({username,password});
    // If input validation fails, return error response
    if(!isValidInput.success){
        return res.status(400).json({error:isValidInput.error.issues.map(issue =>issue.message).join(" and ")});
    }
    // Checking if the user exists in the database
    const userExists = await Admin.findOne({username:username});
    // Assigning extracted data to request object for further use
    req.username = username;
    req.passsword = password;
    req.hashedPassword = hashedPassword;

    // Handling different routes based on the original URL
    if(req.originalUrl === '/admin/signup'){
        // If user exists during signup, return error
        if(userExists){
            return res.status(400).json({error:"admin is already registered!"})
        }
        // If user does not exist, proceed with signup
        next();
    }else if(req.originalUrl==='/admin/signin'){
        // If user does not exist during signin, return error
        if(!userExists){
            return res.status(400).json({error:"admin not found!"})
        }
        // Comparing the provided password with the stored hashed password
        const isValidCreadentials = await compare(password,hashedPassword);
        // If credentials are invalid, return error
        if(!isValidCreadentials){
            return res.status(400).json("incorrect passsword!")
        }
        // If credentials are valid, proceed with signin
        next();
    }
    // If the request URL does not match either signup or signin, proceed without additional checks
    next();
}

// Exporting the middleware function for use in other parts of the application
module.exports = adminMiddleware;
