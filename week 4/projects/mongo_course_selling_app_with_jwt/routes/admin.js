// Importing necessary modules and initializing the router
const {Router} = require("express");
const router = Router();
// Importing models and middleware
const {Admin,Course} = require("../db/index");
const adminMiddleware = require("../middleware/adminMiddleware");
// Importing authentication functions
const {generateToken, verifyToken} = require("../auth/index");
// Importing course validation function
const { courseValidator } = require("../validation");

// Handling admin signup
router.post("/signup",adminMiddleware,async(req,res)=>{
    try{
        // Extracting username and hashed password from the request
        const username = req.username;
        const hashedPassword = req.hashedPassword;
        // Creating a new admin in the database
        await Admin.create({
            username:username,
            password:hashedPassword
        })
        // Sending success response
        return res.status(201).json({"message":"admin registration successfull!"})
    }catch(error){
        // Logging error and sending failure response
        console.error("error during registration!"+error)
        res.status(500).json("admin registration failed")
    }
})

// Handling admin signin
router.post("/signin",adminMiddleware,async (req,res)=>{
    try {
        // Extracting username from the request
        const username = req.username;
        // Generating a token for the admin
        const token = generateToken(username);
        // Sending success response with the token
        res.status(200).json({
            "message":"admin signin successfull",
            "token": `Bearer ${token}`
        })
    } catch (error) {
        // Logging error and sending failure response
        console.error("error during signin!"+error)
        res.status(500).json("admin signin failed")
    }
})

// Handling course creation
router.post("/courses",async(req,res)=>{
    try {
        // Extracting token from the request headers
        const token = req.headers.authorization;
        // Verifying the token
        const decoded = verifyToken(token);
        // Checking if the token is invalid
        if(!decoded){
             return res.status(400).json({error:"invalid token!"});
        }
        // Extracting course details from the request body
        const title = req.body.title;
        const description = req.body.description;
        const imageLink = req.body.imageLink;
        const price = req.body.price;

        // Validating course details
        const isValidCourse = courseValidator({title,description,imageLink,price});
        // Checking if the course details are invalid
        if(!isValidCourse.success){
            return res.status(400).json({error:isValidCourse.error.issues.map(issue=>issue.message).join(" and ")});
        }

        // Checking if a course with the same title already exists
        const isCourseExists = await Course.findOne({title:title});
        if(isCourseExists){
            return res.status(400).json("course with this title already exists!")
        }
        // Creating a new course in the database
        await Course.create({
            title:title,
            description:description,
            imageLink:imageLink,
            price:price
        })
        // Sending success response
        res.status(201).json({"message":"course creation successfull!"})
    } catch (error) {
        // Logging error and sending failure response
        console.error("error during course creation!"+error)
        res.status(500).json("course creation failed")
    }

})

// Handling course fetching
router.get("/courses",async(req,res)=>{
    try {
        // Extracting token from the request headers
        const token = req.headers.authorization;
        // Verifying the token
        const decoded = verifyToken(token);
        // Checking if the token is invalid
        if(!decoded){
             return res.status(400).json({error:"invalid token!"});
        }
        // Fetching all courses from the database
        const courses = await Course.find();
        // Checking if no courses are found
        if(!courses){
            return res.status(200).json({"message":"no courses added yet!"})
        }

        // Sending success response with courses
        res.status(201).json({"message":"courses fetched successfully!",
            "courses":courses
        })
    } catch (error) {
        // Logging error and sending failure response
        console.error("error during course creation!"+error)
        res.status(500).json("course creation failed")
    }

})

// Exporting the router
module.exports = router;
