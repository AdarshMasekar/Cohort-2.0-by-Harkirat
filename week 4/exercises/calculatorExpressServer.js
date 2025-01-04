// week 4/exercises/calculatorExpressServer.js
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

// Route handler for calculating the sum of two numbers.
app.get("/sum", (req, res) => {
    // Parse query parameters 'a' and 'b' as floating-point numbers.
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    // Check if 'a' and 'b' are valid numbers.  If not, send an error response.
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send("Invalid input for 'a' or 'b'.");
    }

    // Calculate the sum.
    const result = a + b;

    // Send the result as a string.
    res.send(result.toString());
});

// Route handler for calculating simple interest.
app.get("/interest", (req, res) => {
    // Parse query parameters 'principal', 'rate', and 'time' as integers.
    const principal = parseInt(req.query.principal);
    const rate = parseInt(req.query.rate);
    const time = parseInt(req.query.time);

    // Input validation: Check if the inputs are valid numbers. If not, send an error response.
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        return res.status(400).send("Invalid input for 'principal', 'rate', or 'time'.");
    }

    // Calculate simple interest.
    const interest = (principal * rate * time) / 100;

    // Calculate the total amount (principal + interest).
    const total = principal + interest; // Corrected calculation

    // Send the result as a JSON object.
    res.send({
        total: total,
        interest: interest
    });
});

// Start the server and listen for connections on the specified port.
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
