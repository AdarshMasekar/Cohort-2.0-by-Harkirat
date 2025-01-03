// Importing required modules
const express = require("express"); // Express framework for building web applications
const {z} = require("zod"); // Zod for schema validation
const app = express(); // Creating an instance of an Express application
const port = 3000; // Defining the port for the server
app.use(express.json()); // Middleware to parse JSON request bodies

// Defining a Zod schema for username validation
const schema = z.string(z.any).min(6).regex(/^[a-zA-Z]+$/);

// POST endpoint for Zod validationx
app.post("/zodValidation",(req,res)=>{
    const username = req.body.username; // Extracting username from request body
    const response = schema.safeParse(username); // Validating the username against the schema
    if(response.success){ // If validation is successful
        res.send(response) // Send the validation response
    }
    else{ // If validation fails
        res.send({"err": response.error.issues[0].message}) // Send the error message
    }
})

// Error handling middleware
app.use((err,req,res,next)=>{
    res.json({msg:"something went wrong with server!"}) // Send a generic error message
})

// Starting the server
app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`) // Log the server status
})
