# JavaScript Basics

## 1. `let`, `const`, and `var`
- **`let`**: Block-scoped variable. Can be updated but not redeclared in the same scope.
- **`const`**: Block-scoped variable. Cannot be updated or redeclared.
- **`var`**: Function-scoped variable. Can be updated and redeclared.

```javascript
let a = 10; // Block-scoped, can be updated
const b = 20; // Block-scoped, cannot be updated
var c = 30; // Function-scoped, can be updated and redeclared
```

---

## 2. Data Types
- **Primitive Types**: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
- **Reference Types**: Objects, Arrays, Functions.

```javascript
let str = "Hello"; // string
let num = 42; // number
let isTrue = true; // boolean
let obj = { key: "value" }; // object
```

---

## 3. Arrow Functions
- Short syntax for defining functions. Does not have its own `this`.

```javascript
const add = (x, y) => x + y;
console.log(add(5, 10)); // 15
```

---

## 4. Template Literals
- Use backticks (`` ` ``) for multi-line strings and embedding expressions.

```javascript
let name = "Adarsh";
console.log(`Hello, ${name}!`); // Hello, Adarsh!
```

---

## 5. Destructuring
- Extract values from arrays or properties from objects.

```javascript
let [x, y] = [10, 20]; // Array destructuring
let { key } = { key: "value" }; // Object destructuring
```

---

## 6. Spread and Rest Operators
- **Spread**: Expands elements.
- **Rest**: Gathers remaining elements.

```javascript
let arr = [1, 2, 3];
let newArr = [...arr, 4]; // [1, 2, 3, 4]

function sum(...numbers) { // Rest
    return numbers.reduce((acc, num) => acc + num, 0);
}
```

---

## 7. Event Listeners
- Attach functions to events on HTML elements.

```javascript
document.querySelector("button").addEventListener("click", () => {
    console.log("Button clicked!");
});
```

---

## 8. Promises and Async/Await
- Handle asynchronous operations.

```javascript
// Using Promises
fetch("https://api.example.com")
    .then(response => response.json())
    .then(data => console.log(data));

// Using Async/Await
async function fetchData() {
    let response = await fetch("https://api.example.com");
    let data = await response.json();
    console.log(data);
}
```

---

## 9. Modules
- Import and export code between files.

```javascript
// file1.js
export const greet = () => "Hello";

// file2.js
import { greet } from "./file1.js";
console.log(greet()); // Hello
```

---

## 10. Array Methods
- Common methods include `.map()`, `.filter()`, `.reduce()`, and `.forEach()`.

```javascript
let nums = [1, 2, 3];
let doubled = nums.map(num => num * 2); // [2, 4, 6]
let even = nums.filter(num => num % 2 === 0); // [2]
let sum = nums.reduce((acc, num) => acc + num, 0); // 6
