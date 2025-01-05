const {userValidation} = require("../validation/validation")
const {User} = require("../db/index")
// Middleware for handling auth
async function userMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    const validated = userValidation({username:username,password:password})
    if(!validated.success){
        return res.status(429).json({message:validated.error.issues.map(issue => issue.message).join(" and")})
    }

    const userExists = await User.findOne({username:username,password:password});
    if(!userExists){
        return res.status(404).json({message:"user not found with these credentials!"})
    }
    else{
        req.user = userExists;
        next();
    }
}

module.exports = userMiddleware;
