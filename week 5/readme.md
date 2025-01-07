# Week 5: React Basics and Full-Stack Todo Application

This week focuses on diving into React and integrating it with the backend built in Week 4. We'll cover fundamental React concepts and build a practical todo application that interacts with a backend API.

## Core Concepts

-   **React Basics**: Understanding components, JSX, state, props, and lifecycle methods.
-   **Component-Based Architecture**: Building UIs by composing reusable components.
-   **State Management**: Managing component-specific data and UI updates.
-   **Props**: Passing data from parent to child components.
-   **Event Handling**: Responding to user interactions.
-   **Frontend to Backend Integration**: Making API calls from React to interact with the backend.
-   **Full-Stack Development**: Connecting the frontend and backend to create a complete application.

## Folder Structure

-   `week 5/`: Contains all the resources and projects for week 5.
    -   `readme.md`: This file, providing an overview of the week's content.
    -   `projects/`: Contains project files.
        -   `todo-app/`: A React-based todo application.
            -   `src/`: Contains the source code for the React application.
                -   `components/`: Contains React components.
                -   `App.js`: The main entry point for the React application.
                -   `index.js`: Entry point for the React app.
            -   `package.json`: Lists project dependencies and scripts.
            -   `.gitignore`: Specifies intentionally untracked files that Git should ignore.

## Detailed Breakdown

### 5.1 React Fundamentals

-   **Components**:
    -   Understanding functional and class components.
    -   Creating reusable UI elements.
-   **JSX**:
    -   Writing HTML-like syntax in JavaScript.
    -   Embedding JavaScript expressions in JSX.
-   **State**:
    -   Managing component-specific data.
    -   Updating the UI when state changes.
-   **Props**:
    -   Passing data from parent to child components.
    -   Using props to customize components.
-   **Event Handling**:
    -   Responding to user interactions (e.g., clicks, form submissions).
    -   Using event handlers to update state.

### 5.2 Building a Todo Application

-   **Component Structure**:
    -   Creating components for the todo list, individual todo items, and input fields.
-   **State Management**:
    -   Using state to store the list of todos.
    -   Updating state when adding, deleting, or completing todos.
-   **User Input**:
    -   Handling user input to add new todos.
-   **Displaying Todos**:
    -   Rendering the list of todos dynamically.
-   **Completing Todos**:
    -   Implementing functionality to mark todos as complete.
-   **Deleting Todos**:
    -   Implementing functionality to remove todos from the list.

### 5.3 Integrating with the Backend

-   **API Calls**:
    -   Making HTTP requests to the backend API built in Week 4.
    -   Using `fetch` or `axios` to interact with the API.
-   **Data Fetching**:
    -   Fetching todos from the backend when the component mounts.
-   **Data Submission**:
    -   Sending new todos to the backend when they are added.
-   **Updating Data**:
    -   Updating the backend when todos are completed or deleted.
-   **Error Handling**:
    -   Handling errors that occur during API calls.

## Projects

### `todo-app`

-   **Description**: A React-based todo application that integrates with the backend API from Week 4.
-   **Key Features**:
    -   Displaying a list of todos fetched from the backend.
    -   Adding new todos through a form.
    -   Marking todos as complete.
    -   Deleting todos.
-   **Files**:
    -   `src/components/`: Contains React components for the todo list, individual todo items, and input fields.
    -   `src/App.js`: The main entry point for the React application, handling state and API calls.
    -   `package.json`: Lists project dependencies, including React and any libraries for making API calls.
    -   `.gitignore`: Excludes `node_modules` and other unnecessary files from version control.

## Prerequisites

-   Solid understanding of HTML, CSS, and JavaScript.
-   Basic knowledge of HTTP protocols.
-   Familiarity with Git version control.
-   Completion of Week 4's backend project.

## Installation Requirements

1.  **Node.js**
    -   LTS version recommended.
    -   npm (included with Node.js).

## Getting Started

1.  Clone this repository.
2.  Navigate to the `week 5/projects/todo-app` directory.
3.  Run `npm install` to install the required dependencies.
4.  Start the React application using `npm start`.
5.  Ensure the backend from Week 4 is running.
6.  Follow individual lesson instructions.
7.  Complete assignments and exercises.

## Additional Notes

-   The frontend code for the todo application is in a separate Git repository.
-   The backend API from Week 4 should be running for the todo application to function correctly.
-   The `package.json` file in the `todo-app` project lists dependencies like `react`, `react-dom`, and any libraries for making API calls (e.g., `axios`).
-   The `.gitignore` file in the `todo-app` project excludes `node_modules` and other unnecessary files from version control.

## Conclusion

This week's content aims to provide a solid foundation in React and full-stack development. By the end of this week, you should be able to build interactive UIs using React, manage component state, and integrate your frontend with a backend API. The todo application project provides practical experience in building a complete full-stack application.
