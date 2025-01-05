// Importing necessary modules and models
const {Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/userMiddleware");
const {User,Course} = require("../db/index")
const {generateToken,verifyToken} = require("../auth/index")

// Handling user signup
router.post("/signup",userMiddleware,async(req,res)=>{
    try{
        // Extracting username and hashedPassword from the request
        const username = req.username;
        const hashedPassword = req.hashedPassword;
        // Creating a new user in the database
        await User.create({
            username:username,
            password:hashedPassword
        })
        // Sending success response
        return res.status(201).json({"message":"user registration successfull!"})
    }catch(error){
        console.error("error during registration!"+error)
        // Sending error response
        res.status(500).json("user registration failed")
    }
})

// Handling user signin
router.post("/signin",userMiddleware,async (req,res)=>{
    try {
        // Extracting username from the request
        const username = req.username;
        // Generating a token for the user
        const token = generateToken(username);
        // Sending success response with the token
        res.status(200).json({
            "message":"user signin successfull",
            "token": `Bearer ${token}`
        })
    } catch (error) {
        console.error("error during signin!"+error)
        // Sending error response
        res.status(500).json("user signin failed")
    }
})

// Fetching all courses
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
        res.status(200).json({"message":"courses fetched successfully!",
            "courses":courses
        })
    } catch (error) {
        console.error("error during course fetching!"+error)
        // Sending error response
        res.status(500).json("failed to fetch courses!")
    }

})

// Fetching a specific course by courseId
router.get("/courses/:courseId",async(req,res)=>{
    try {
        // Extracting token from the request headers
        const token = req.headers.authorization;
        // Verifying the token
        const decoded = verifyToken(token);
        // Checking if the token is invalid
        if(!decoded){
             return res.status(400).json({error:"invalid token!"});
        }
        // Extracting courseId from the request parameters
        const courseId = req.params.courseId;
        // Fetching the course from the database
        const course = await Course.findOne({_id:courseId});
        // Checking if the course is not found
        if(!course){
            return res.status(200).json({"message":"course not found!"})
        }
        // Sending success response with the course
        res.status(200).json({"message":"courses fetched successfully!",
            "course":course
        })
    } catch (error) {
        console.error("error during course fetching!"+error)
        // Sending error response
        res.status(500).json("failed to fetch course!")
    }

})

// Handling course purchase
router.post("/courses/purchase/:courseId",async(req,res)=>{
    try {
        // Extracting token from the request headers
        const token = req.headers.authorization;
        // Verifying the token
        const decoded = verifyToken(token);
        // Checking if the token is invalid
        if(!decoded){
             return res.status(400).json({error:"invalid token!"});
        }
        // Extracting username from the decoded token
        const username = decoded.username;
        // Extracting courseId from the request parameters
        const courseId = req.params.courseId;
        // Fetching the course from the database
        const course = await Course.findOne({_id:courseId});
        // Checking if the course is not found
        if(!course){
            return res.status(200).json({"message":"course not found!"})
        }
        // Fetching the user from the database
        const user = await User.findOne({ username: username });

        // Checking if the course is already purchased
        if (user.purchasedCourses.includes(courseId)) {
            return res.status(400).json({ message: "Course already purchased!" });
        }
        // Updating the user's purchasedCourses with the new courseId
        await User.findOneAndUpdate(
            { username: username }, // Search by username
            { $push: { purchasedCourses: courseId } } // Add courseId to purchasedCourse
            );

        // Sending success response
        res.status(200).json({"message":"course purchase successfully!",
            "course": course
        })
    } catch (error) {
        console.error("error during purchasing course!"+error)
        // Sending error response
        res.status(500).json("failed to purchase course!")
    }

})

// Fetching all purchased courses for a user
router.get("/purchasedCourses",async(req,res)=>{
    try {
        // Extracting token from the request headers
        const token = req.headers.authorization;
        // Verifying the token
        const decoded = verifyToken(token);
        // Checking if the token is invalid
        if(!decoded){
             return res.status(400).json({error:"invalid token!"});
        }
        // Extracting username from the decoded token
        const username = decoded.username;
        // Fetching the user from the database
        const user = await User.findOne({username:username});
        // Extracting purchased courses from the user
        const courses = user.purchasedCourses;

        // Checking if no courses are found
        if(!courses){
            return res.status(200).json({"message":"courses not found!"})
        }
        // Sending success response with courses
        res.status(200).json({"message":"courses fetched successfully!",
            "course":courses
        })
    } catch (error) {
        console.error("error during course fetching!"+error)
        // Sending error response
        res.status(500).json("failed to fetch courses!")
    }

})

// Exporting the router
module.exports = router
