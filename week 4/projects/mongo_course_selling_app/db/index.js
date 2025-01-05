const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://adarsh:<your password>@cluster0.eowltwt.mongodb.net/coursesellingapp')
.then(()=>{
    console.log('connetion to db is successfull');
}).catch((err)=>{
    console.log(err)
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:{type:String,required:true},
    password:{type:String,required:true}

});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:{type:String,required:true},
    password:{type:String,required:true},
    purchasedCourse:{type:mongoose.Schema.Types.ObjectId,ref:"Course"}
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true}
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}
