const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course} = require("../db/index")
const {adminValidation,courseValidation} = require("../validation/validation");
const courseMiddleware = require("../middleware/course");


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const validated = adminValidation({username:username,password:password})
    if(!validated.success){
        return res.status(400).json({error:validated.error.issues.map(issue=>issue.message).join(" and")});
    }
    const adminAlreadyExists = await Admin.findOne({username:username});
    if(adminAlreadyExists){
        return res.status(400).json({error:"admin already registered!"})
    }
    try{
        const adminRegistered = await Admin.create({
        username:username,
        password:password
    })
        return res.status(201).json({message:`${adminRegistered.username} is registered successfully!` })
    }catch(error){
        res.status(400).json({error:"something went wrong with server please try again later!"})
    }
});

router.post('/courses', adminMiddleware,courseMiddleware,async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    try{
        const courseAdded = await Course.create({
            title:title,
            description:description,
            price:price
        })
        return res.status(201).json({message:`${courseAdded.title} is registered successfully!` })
    }catch(error){
        res.status(400).json({error:"something went wrong with server please try again later!"})
    }
});

router.get('/courses', adminMiddleware,async(req, res) => {
    // Implement fetching all courses logic
    try{
        const courses = await Course.find();
        res.status(200).json(courses);
    }catch(error){
        res.json({error:"something went wrong with sever please try again later!"})
    }
});

module.exports = router;
