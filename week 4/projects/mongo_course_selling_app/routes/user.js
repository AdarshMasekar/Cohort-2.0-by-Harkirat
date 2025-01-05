const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { userValidation } = require("../validation/validation");
const {User,Course} = require("../db/index")

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    const validated = userValidation({username:username,password:password})
    if(!validated.success){
        return res.status(400).json({error:validated.error.issues.map(issue=>issue.message).join(" and")});
    }
    const userAlreadyExists = await User.findOne({username:username});
    if(userAlreadyExists){
        return res.status(400).json({error:"user already registered!"})
    }
    try{
        const userRegistered = await User.create({
        username:username,
        password:password
    })
        return res.status(201).json({message:`${userRegistered.username} is registered successfully!` })
    }catch(error){
        res.status(400).json({error:"something went wrong with server please try again later!"})
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
        const courses = await Course.find();
        res.status(200).json(courses);
    }catch(error){
        res.json({error:"something went wrong with the server please try again later!"})
    }
});

router.get('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    try{
        const course = await Course.findOne({
        _id:req.params.courseId
        })
        if(!course){
            return res.json("course not found with this courseId!")
        }
        res.status(200).json(course)
    }catch(error){
        res.json({error:"something went wrong with the server please try again later!"})
    }

});

router.post("/courses/purchase/:courseId",userMiddleware,async(req,res)=>{
    const user = req.user;
    const course = req.params.courseId;
    try{
        const purchased = await User.findOneAndUpdate({username:user.username},{$push:{purchasedCourse:course}});
        res.status(200).json({message:`course purchase successfull!`});
    }
    catch(error){
        res.json({error:"something went wrong with the server please try again later!"})
    }
})

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching ed courses logic
    const user = req.user
    try{
        const courses = user.purchasedCourse;
        res.json(courses)
    }catch(error){
        console.log({error:"something went wrong with the server please try again later!"})
    }

});

module.exports = router
