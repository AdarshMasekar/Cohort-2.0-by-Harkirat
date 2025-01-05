// Importing mongoose and dotenv for database connection and environment variables
const mongoose = require("mongoose");
require("dotenv").config();

// Setting up the connection string for MongoDB
const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString)
    .then(()=>{
        console.log('database connection successful!')
    }).catch((err)=>{
        console.error(err)
    })

// Defining the schema for the User model
const userSchema = new mongoose.Schema({
    username:{type:String,required:true}, // Username field
    password:{type:String,required:true}, // Password field
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:"Course"}] // Array of purchased courses
})

// Defining the schema for the Admin model
const adminSchema = new mongoose.Schema({
    username:{type:String,required:true}, // Username field
    password:{type:String,required:true} // Password field
})

// Defining the schema for the Course model
const courseSchema = new mongoose.Schema({
    title:{type:String,required:true}, // Title field
    description:{type:String,required:true}, // Description field
    imageLink:{type:String,required:true}, // Image link field
    price:{type:Number,required:true} // Price field
})

// Creating models from the schemas
const User = mongoose.model("User",userSchema);
const Admin = mongoose.model("Admin",adminSchema);
const Course = mongoose.model("Course",courseSchema);

// Exporting the models for use in other parts of the application
module.exports = {
    User,
    Admin,
    Course
}
