# Week 3: Backend Development & Authentication

This week's focus is on backend development, authentication, and database integration. The goal is to build a solid foundation for creating secure and scalable web applications.

## Core Concepts

-   **JavaScript Fundamentals**: Review of advanced JavaScript concepts and modern features.
-   **Node.js**: Understanding the Node.js runtime environment and its architecture.
-   **Express.js**: Using Express.js for building web applications and APIs.
-   **Database Management**: Introduction to relational and non-relational databases.
-   **Authentication & Authorization**: Implementing secure authentication using JWT.
-   **Middleware**: Implementing custom middleware for request handling and validation.
-   **DOM Manipulation**: Introduction to basic DOM manipulation and event handling.

## Folder Structure

-   `week 3/`: Contains all the resources and projects for week 3.
    -   `readme.md`: This file, providing an overview of the week's content.
    -   `exercises/`: Contains hands-on exercises.
        -   `hospital.js`: An exercise file for building a basic hospital management system with middleware.
        -   `jwtdemo.js`: An exercise file for implementing JWT authentication.
        -   `userRoleBasedAccessMiddleware.js`: An exercise file for implementing user role-based access control using middleware.
    -   `resources/`: Contains additional resources.
        -   `DOM_Introduction.md`: A markdown file explaining DOM manipulation basics.

## Detailed Breakdown

### 3.0 Foundation & Setup

-   **JavaScript Fundamentals Review**:
    -   Advanced concepts, modern JavaScript features, and asynchronous programming.
-   **Node.js Runtime**:
    -   Understanding Node.js architecture, event-driven programming, and the module system.
-   **Express.js**:
    -   Basic routing, request handling, and response management.
-   **Database Introduction**:
    -   Relational vs. non-relational databases, database design principles, and query fundamentals.

### 3.1 Middleware & Error Handling

-   Global middleware implementation.
-   Custom middleware creation.
-   Error handling strategies.
-   Request-response pipeline.
-   Zod input validations.
-   Introduction to Authentication.

### 3.2 Authentication System

-   Express.js integration.
-   JWT (JSON Web Tokens) implementation.
-   MongoDB user management.
-   Secure authentication flows.

### 3.3 Database Integration

-   MongoDB setup and operations.
-   Database schema design.
-   CRUD operations.
-   Data validation.

### 3.4 Authentication Deep Dive

-   JWT best practices.
-   Token management.
-   Security considerations.
-   Practical implementation.

### 3.5 DOM Introduction

-   DOM manipulation basics.
-   Event handling.
-   Dynamic content updates.
-   Browser APIs.

## Exercises

-   `week 3/exercises/hospital.js`:
    -   An exercise file that sets up a basic hospital management system using Express.js.
    -   Includes middleware for checking user credentials and validating kidney IDs.
    -   Demonstrates how to use middleware for request validation and authentication.
-   `week 3/exercises/jwtdemo.js`:
    -   An exercise file that implements JWT authentication using Express.js, Zod, Mongoose, and bcrypt.
    -   Includes user signup and signin routes with password hashing and JWT token generation.
    -   Demonstrates how to use JWT for secure authentication and authorization.
    -   This file uses `express` (line 2), `jsonwebtoken` (line 3), `zod` (line 4), `mongoose` (line 5), and `bcrypt` (line 6).
    -   It defines a user schema using Zod (lines 9-12) and connects to MongoDB (lines 14-17).
    -   It includes routes for user registration (lines 56-69) and login (lines 71-87), and a middleware to validate JWT tokens (lines 34-43).
-   `week 3/exercises/userRoleBasedAccessMiddleware.js`:
    -   An exercise file that implements user role-based access control using middleware.
    -   Includes user registration and login routes with role-based access control.
    -   Demonstrates how to use middleware for authorization based on user roles.
    -   This file uses `express` (line 2), `mongoose` (line 3), `zod` (line 4), `bcrypt` (line 5), and `jsonwebtoken` (line 6).
    -   It defines a user schema with roles (lines 22-26) and connects to MongoDB (lines 13-19).
    -   It includes middleware for validating user input (lines 38-46) and credentials (lines 49-66).
    -   It has routes for login (lines 104-121) and registration (lines 124-144), and uses middleware for role-based access control (lines 147-154).

## Resources

-   `week 3/resources/DOM_Introduction.md`:
    -   Provides an introduction to DOM manipulation, including selecting elements, modifying content and attributes, adding and deleting elements, and handling events.
    -   Explains how to select elements using `getElementById`, `getElementsByClassName`, `querySelector`, and `querySelectorAll`.
    -   Demonstrates how to modify content using `textContent` and attributes using `setAttribute`.
    -   Shows how to add elements using `createElement` and `appendChild`, and how to delete elements using `remove`.
    -   Introduces common DOM events like `click`, `mouseover`, and `keydown`.

## Prerequisites

-   Basic JavaScript knowledge.
-   Understanding of HTTP protocols.
-   Familiarity with web development concepts.

## Installation Requirements

1.  **MongoDB**
    -   Latest stable version.
    -   Compass GUI (optional).
2.  **PostgreSQL**
    -   Latest stable version.
    -   pgAdmin (recommended).
3.  **Node.js**
    -   LTS version recommended.
    -   npm (included with Node.js).

## Getting Started

1.  Clone this repository.
2.  Install required dependencies.
3.  Follow individual lesson instructions.
4.  Complete assignments and exercises.

## Additional Notes

-   The `package.json` file (lines 1-20) lists dependencies like `bcrypt`, `express`, `express-rate-limit`, `jsonwebtoken`, `mongoose`, and `zod`, indicating the use of Node.js, Express, MongoDB, Zod for validation, JWT for authentication, and bcrypt for password hashing.
-   The `week 3/readme.md` file (lines 1-109) provides a detailed table of contents and an overview of the topics covered in week 3.
-   The `week 3/readme.md` file also includes links to the official documentation for Node.js, Express.js, MongoDB, and PostgreSQL.

## Conclusion

This week's content aims to provide a comprehensive understanding of backend development, authentication, and database integration. By the end of this week, you should be able to build secure and scalable web applications using Node.js, Express.js, and MongoDB. You should also be able to implement authentication and authorization using JWT and middleware.
