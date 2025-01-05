const {adminValidation} = require("../validation/validation")
const {Admin} = require("../db/index")
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    const validated = adminValidation({username:username,password:password})
    if(!validated.success){
        return res.status(429).json({message:validated.error.issues.map(issue => issue.message).join(" and")})
    }

    const adminExists = await Admin.findOne({username:username,password:password});

    if(!adminExists){
        return res.status(404).json({message:"admin not found with these credentials!"})
    }
    else{
        next();
    }
}

module.exports = adminMiddleware;
