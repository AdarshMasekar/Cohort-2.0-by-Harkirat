const express = require('express'); // Importing the express module
const app = express(); // Creating an instance of express
app.use(express.json()); // Middleware to parse JSON request bodies
const port = 3000; // Setting the port for the server

function userMiddleware(req,res,next){ // Middleware to check user credentials
    const username = req.headers.username; // Retrieving username from headers
    const password = req.headers.password; // Retrieving password from headers
    if(username != "adarsh" || password != "passwordofadarsh"){ // Checking credentials
        res.status(400).json( // Sending error response if credentials are invalid
            {
                "msg":"something is wrong with your credentials!"
            }
        );
    }
    else{
        next(); // Proceed to the next middleware if credentials are valid
    }
}

function kidneyMiddleware(req,res,next) { // Middleware to validate kidneyId
    const kidneyId = req.query.kidneyId; // Retrieving kidneyId from query parameters
    if(kidneyId != 1 && kidneyId != 2){ // Checking if kidneyId is valid
        res.status(400).json( // Sending error response if kidneyId is invalid
            {
                "msg":"something is wrong with your inputs!"
            }
        );
    }
    else{
        next(); // Proceed to the next middleware if kidneyId is valid
    }
}

app.get("/health-checkup",userMiddleware,kidneyMiddleware,(req,res)=>{ // Route for health checkup
    res.json({"msg":"your kidney is fine!"}) // Sending success response
})

app.listen(port,(req,res) =>{ // Starting the server
    console.log(`server is running on port ${port}`) // Logging server status
})
