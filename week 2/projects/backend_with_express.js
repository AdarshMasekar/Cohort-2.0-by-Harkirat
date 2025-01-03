const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.eowltwt.mongodb.net/BookStore").then(()=>{
    console.log("database connected successfully");
}).catch(err =>{
    console.log("database connection error: ",err)
})


const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String
});

const Book = mongoose.model("Book", BookSchema);

app.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.get("/book/:bookId", async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json(book);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.post("/book", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.put("/book/:bookId", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json(updatedBook);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.delete('/book/:bookId', async (req, res) => {
    try {
        const deletedBook = await Book.findById(req.params.bookId);
        if (!deletedBook) {
            return res.status(404).json({ msg: "Book not found" });
        }
        await Book.findByIdAndDelete(req.params.bookId);
        res.status(200).json(deletedBook);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
