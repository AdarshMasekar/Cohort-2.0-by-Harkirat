## Create a course selling website

### Description

This project implements a course selling website with JWT authentication and MongoDB for persistent data storage.
It includes signup and signin endpoints for both users and admins.
All authenticated requests require a JWT in the `Authorization` header (e.g., `Authorization: Bearer <actual token>`).


## Routes

### Admin Routes:

- **POST /admin/signup**
  - Description: Creates a new admin account.
  - Input Body: `{ username: 'admin', password: 'pass' }`
  - Output: `{ message: 'Admin created successfully' }`
- **POST /admin/signin**
  - Description: Logs in an admin account.
  - Input Body: `{ username: 'admin', password: 'pass' }`
  - Output: `{ token: 'Bearer your-token' }`
- **POST /admin/courses**
  - Description: Creates a new course.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`, Body: `{ title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }`
  - Output: `{ message: 'Course created successfully', courseId: "new course id" }`
- **GET /admin/courses**
  - Description: Returns all the courses.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`
  - Output: `{ courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }`

### User routes

- **POST /users/signup**
  - Description: Creates a new user account.
  - Input: `{ username: 'user', password: 'pass' }`
  - Output: `{ message: 'User created successfully' }`
- **POST /users/signin**
  - Description: Logs in a user account.
  - Input: `{ username: 'user', password: 'pass' }`
  - Output: `{ token: 'Bearer your-token' }`
- **GET /users/courses**
  - Description: Lists all the courses.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`
  - Output: `{ courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }`
- **GET /users/courses/:courseId**
  - Description: Gets a specific course by ID. `courseId` in the URL path should be replaced with the ID of the course.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`
  - Output: `{ message: 'Course fetched successfully', course: { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true } }`
- **POST /users/courses/purchase/:courseId**
  - Description: Purchases a course. `courseId` in the URL path should be replaced with the ID of the course to be purchased.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`
  - Output: `{ message: 'Course purchased successfully', course: { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true } }`
- **GET /users/purchasedCourses**
  - Description: Lists all the courses purchased by the user.
  - Input: Headers: `{ 'Authorization': 'Bearer <your-token>' }`
  - Output: `{ purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }`


### Key Features:

*   **JWT Authentication:** Secure authentication using JSON Web Tokens.
*   **MongoDB Persistence:** Data is stored persistently using MongoDB.
*   **Input Validation:** Input data is validated using Zod.
*   **Password Hashing:** Passwords are securely hashed using bcrypt.
*   **Middleware:** Includes middleware for user and admin authentication and input validation.
*   **Error Handling:** Global error handling middleware is implemented.
