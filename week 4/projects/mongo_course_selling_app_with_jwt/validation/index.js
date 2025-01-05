const z = require("zod"); // Importing the Zod library for schema validation

// Defining the schema for user validation
const userSchema = z.object({
    username:z.string().min(3,"username must contain at least 3 letters!"), // Ensuring username is at least 3 characters long
    password:z.string().min(8,"password must be at least 8 letters") // Ensuring password is at least 8 characters long
})

// Defining the schema for admin validation
const adminSchema = z.object({
    username:z.string().min(3,"username must contain at least 3 letters!"), // Ensuring username is at least 3 characters long
    password:z.string().min(8,"password must be at least 8 letters") // Ensuring password is at least 8 characters long
})

// Defining the schema for course validation
const courseSchema = z.object({
    title:z.string().min(5,'course title should be at least 5 letters!'), // Ensuring course title is at least 5 characters long
    description:z.string().min(10,'course description should be at least 10 letters!'), // Ensuring course description is at least 10 characters long
    imageLink:z.string().url(), // Ensuring imageLink is a valid URL
    price:z.number().gt(1) // Ensuring price is greater than 1
})

// Function to validate user data against the userSchema
const userValidator = ({username,password}) =>{
    return userSchema.safeParse({
        username:username,
        password:password
    });
}

// Function to validate admin data against the adminSchema
const adminValidator = ({username,password}) =>{
    return adminSchema.safeParse({
        username:username,
        password:password
    });
}

// Function to validate course data against the courseSchema
const courseValidator = ({title,description,imageLink,price}) =>{
    return courseSchema.safeParse({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price});
}

// Exporting the validators for use in other parts of the application
module.exports ={
    userValidator,
    adminValidator,
    courseValidator
}
