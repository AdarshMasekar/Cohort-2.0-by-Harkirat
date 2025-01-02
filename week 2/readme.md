# BookStore API

This is a simple RESTful API for managing books in a bookstore. The API is built using Node.js, Express, and MongoDB.

## Prerequisites

- Node.js and npm installed on your system
- MongoDB Atlas account or a local MongoDB instance

## Setup Instructions

1. Clone the repository or create a new directory and add the provided code.

2. Install dependencies:
   ```bash
   npm install express mongoose
   ```

3. Update the MongoDB connection string in the code:
   Replace `<username>` and `<password>` in the following line with your MongoDB Atlas credentials:
   ```javascript
   mongoose.connect("mongodb+srv://<username>:<password>@cluster0.eowltwt.mongodb.net/BookStore")
   ```
   Alternatively, use your local MongoDB URI (e.g., `mongodb://localhost:27017/BookStore`).

4. Start the server:
   ```bash
   node app.js
   ```

5. The server will run on `http://localhost:3000` by default.

---

## API Endpoints

### 1. **Get All Books**
**Endpoint:** `GET /`

Fetches a list of all books.

- **Response:**
  - Status: `200 OK`
  - Body: Array of books

#### Example Response:
```json
[
  {
    "_id": "64a123456789",
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Genre"
  }
]
```

---

### 2. **Get a Single Book by ID**
**Endpoint:** `GET /book/:bookId`

Fetches details of a book by its ID.

- **Parameters:**
  - `bookId`: The ID of the book to fetch.

- **Response:**
  - Status: `200 OK` (if found)
  - Status: `404 Not Found` (if the book doesn't exist)

#### Example Response:
```json
{
  "_id": "64a123456789",
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre"
}
```

---

### 3. **Add a New Book**
**Endpoint:** `POST /book`

Adds a new book to the database.

- **Request Body:**
  ```json
  {
    "title": "New Book",
    "author": "New Author",
    "genre": "New Genre"
  }
  ```

- **Response:**
  - Status: `201 Created`
  - Body: The newly added book

#### Example Response:
```json
{
  "_id": "64a123456789",
  "title": "New Book",
  "author": "New Author",
  "genre": "New Genre"
}
```

---

### 4. **Update a Book by ID**
**Endpoint:** `PUT /book/:bookId`

Updates the details of a book by its ID.

- **Parameters:**
  - `bookId`: The ID of the book to update.

- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "genre": "Updated Genre"
  }
  ```

- **Response:**
  - Status: `200 OK` (if updated successfully)
  - Status: `404 Not Found` (if the book doesn't exist)

#### Example Response:
```json
{
  "_id": "64a123456789",
  "title": "Updated Title",
  "author": "Updated Author",
  "genre": "Updated Genre"
}
```

---

### 5. **Delete a Book by ID**
**Endpoint:** `DELETE /book/:bookId`

Deletes a book from the database by its ID.

- **Parameters:**
  - `bookId`: The ID of the book to delete.

- **Response:**
  - Status: `200 OK` (if deleted successfully)
  - Status: `404 Not Found` (if the book doesn't exist)

#### Example Response:
```json
{
  "_id": "64a123456789",
  "title": "Deleted Book",
  "author": "Deleted Author",
  "genre": "Deleted Genre"
}
```

---

## Error Handling
- If the database connection fails or an error occurs during request handling, the API will return a `500 Internal Server Error` response with a message.

#### Example Error Response:
```json
{
  "msg": "Internal server error"
}
```

---

## Testing with Postman
1. Import the API endpoints into Postman.
2. Use the appropriate HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) with the required body or parameters.
3. Verify the responses and debug any issues using the console logs.

---

## Notes
- Ensure your MongoDB instance is running before testing the API.
- Validate input data before sending requests to avoid errors.

---

Happy coding! 🚀
