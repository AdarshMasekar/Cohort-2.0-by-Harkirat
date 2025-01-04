# DOM (Document Object Model)

## What is DOM?
The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a document as a tree of objects that can be manipulated using JavaScript.
- **It is not a programming language.**
- DOM is a Web API used to build and interact with websites dynamically.

---

## How to Access DOM?
You can access the DOM using JavaScript. For example:

```javascript
// Access the document's title
console.log(document.title);

// Access an element by ID
let element = document.getElementById("myElement");
console.log(element);
```

---

## How to Make DOM Dynamic?
You can make the DOM dynamic by:
1. Adding or removing elements.
2. Modifying content or attributes.
3. Attaching event listeners for interactive functionality.

Example:

```javascript
// Change content dynamically
let element = document.getElementById("header");
element.textContent = "Welcome to the Dynamic Web!";

// Add a new element dynamically
let newElement = document.createElement("p");
newElement.textContent = "This is a new paragraph.";
document.body.appendChild(newElement);
```

---

## DOM Tree
The DOM represents a document as a tree structure, with each node representing a part of the document:
- The root node is the `<html>` element.
- Child nodes represent nested elements, text, and attributes.

Example:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Sample Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a sample document.</p>
</body>
</html>
```

DOM Tree Representation:
```
html
├── head
│   └── title
├── body
    ├── h1
    └── p
```

---

## `createElement()` Method
The `createElement()` method is used to create a new HTML element dynamically.

Example:

```javascript
let newDiv = document.createElement("div");
newDiv.textContent = "I am a new div!";
document.body.appendChild(newDiv);
```

Output:
```
<div>I am a new div!</div>
```

---

## Multiple Ways of Finding HTML Elements
1. **By ID**:
   ```javascript
   let element = document.getElementById("myID");
   ```
2. **By Tag Name**:
   ```javascript
   let elements = document.getElementsByTagName("p");
   ```
3. **By Class Name**:
   ```javascript
   let elements = document.getElementsByClassName("myClass");
   ```
4. **By CSS Selectors**:
   ```javascript
   let element = document.querySelector(".myClass");
   let elements = document.querySelectorAll("div > p");
   ```
5. **By HTML Object Collection**:
   ```javascript
   let forms = document.forms; // Access all forms in the document
   ```

---

## Changing HTML Elements

### Modify Content:
```javascript
document.getElementById("header").textContent = "New Header";
```

### Modify Attributes:
```javascript
document.getElementById("link").setAttribute("href", "https://example.com");
```

---

## Adding and Deleting Elements

### Adding Elements:
```javascript
let newElement = document.createElement("li");
newElement.textContent = "New Item";
document.querySelector("ul").appendChild(newElement);
```

### Deleting Elements:
```javascript
let element = document.getElementById("toBeRemoved");
element.remove();
```

---

## DOM Events

### Common Events
1. `click`
2. `mouseover`
3. `keydown`

Example:

```javascript
let button = document.getElementById("myButton");
button.addEventListener("click", function () {
  alert("Button Clicked!");
});
```

---

## DOM `addEventListener`
The `addEventListener()` method attaches an event handler to an element.

### Syntax:
```javascript
element.addEventListener(event, function, useCapture);
```

### Example:

```javascript
let button = document.getElementById("alertButton");
button.addEventListener("click", function () {
  alert("You clicked me!");
});

// Adding multiple event listeners
button.addEventListener("mouseover", function () {
  button.style.backgroundColor = "yellow";
});
```

Output:
- Clicking the button displays an alert.
- Hovering changes the background color to yellow.
