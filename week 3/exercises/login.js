const express = require("express");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect("mongodb+srv://adarsh:<your password>@cluster0.eowltwt.mongodb.net/Authentication").then(()=>{
    console.log("database connected successfully!");
}).catch(err=>{
    console.log("database connection error: ",err);
})

const userSchema = mongoose.Schema({
    username: String,
    password:String
})

const saltRounds = 10;


const user = mongoose.model("user",userSchema);

// verification during the login
async function userMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;

    const findUser = await user.findOne({username:username});
    if(findUser == null){
        res.status(404).json({"msg":"user not found!"});
        return
    }
    let hashedPassword = findUser.password;
    let passwordCheck = await bcrypt.compare(password,hashedPassword);

    if(!passwordCheck){
        res.status(401).json({"msg":"credentials are wrong!"})
        return
    }
    else{
        next();
    }
}

// registration endpoint
app.post("/user",async(req,res)=>{
    try{
        let username= req.body.username;
        let password = req.body.password;
        const salt = await bcrypt.genSalt(saltRounds);
        let hashedPassword = await bcrypt.hash(password,salt);
        console.log(hashedPassword)
        const newUser = new user({
            username:username,
            password:hashedPassword
        })
        await newUser.save();
        res.status(201).json({"msg":"user registration successful!"});
    }catch(err){
        console.log({"err":err})
        res.status(500).json({"msg":"registration failed!"});
    }

})
app.get("/",userMiddleware,(req,res) => {
    console.log("welcome to home page!");
    res.status(200).json({'msg':"Authenticated user logged in!"})
})

app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`)
})
