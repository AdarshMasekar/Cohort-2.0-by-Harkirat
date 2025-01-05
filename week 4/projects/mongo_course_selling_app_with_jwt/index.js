const express = require('express');
const userRouter = require("./routes/user")
const adminRouter = require("./routes/admin")
const app = express();
const port = 3000;

app.use(express.json());
app.use("/user",userRouter);
app.use("/admin",adminRouter);


app.get("/",(req,res)=>{
    res.json("welcome to home page!")
})


app.use((err,req,res,next)=>{
    if(err){
        console.log("some exception catched by global exception handler:"+err)
    }
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
