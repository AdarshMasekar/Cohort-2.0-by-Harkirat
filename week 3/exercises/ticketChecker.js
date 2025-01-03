// week 3/exercises/ticketChecker.js
const express = require("express");
const app = express();

app.use(express.json());
const port = 3000;

// Middleware to check for a valid ticket.
function ticketCheckerMiddleware(req, res, next) {
    const ticket = req.query.ticket;
    // Check if the ticket is "free".
    if (ticket === "free") {
        // If the ticket is "free", proceed to the next middleware or route handler.
        next();
    } else {
        // If the ticket is not "free", send a response indicating that the user is not allowed.
        res.status(403).json({ msg: "You are not allowed in the ride!" }); // Use 403 for Forbidden
    }
}

app.use(ticketCheckerMiddleware);


// Route handler for ride 1.
app.get("/ride1", (req, res) => {
    res.json("Welcome to ride 1");
});

// Route handler for ride 2.
app.get("/ride2", (req, res) => {
    res.json("Welcome to ride 2");
});

// Route handler for ride 3.
app.get("/ride3", (req, res) => {
    res.json("Welcome to ride 3");
});

// Error handling middleware.  Catches errors from any middleware or route handler.
app.use((err, req, res, next) => {
    if (err) {
        // Important:  Provide a more specific error message to the client.
        // Don't just say "something went wrong".
        console.error("Error:", err); // Log the error for debugging
        res.status(500).json({ msg: "An error occurred. Please try again later." }); // Use 500 for Internal Server Error
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
