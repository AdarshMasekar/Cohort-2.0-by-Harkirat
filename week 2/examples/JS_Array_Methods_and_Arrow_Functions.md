
## 1. `map` - Transforming Elements of an Array
The `map` method creates a new array by applying a given function to each element of the array.

### Example:
```javascript
const numbers = [1, 2, 3, 4, 5];

// Use map to square each number
const squaredNumbers = numbers.map(num => num * num);

console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]
```
- **Explanation**: The `map` method takes each number, squares it, and returns a new array of squared values.

---

## 2. `filter` - Filtering Elements Based on Condition
The `filter` method creates a new array containing only elements that pass a certain test.

### Example:
```javascript
const numbers = [1, 2, 3, 4, 5];

// Use filter to get only even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);

console.log(evenNumbers); // Output: [2, 4]
```
- **Explanation**: The `filter` method returns an array of numbers that satisfy the condition (`num % 2 === 0` for even numbers).

---

## 3. `reduce` - Reducing an Array to a Single Value
The `reduce` method applies a function to reduce the array to a single value, such as a sum, product, etc.

### Example:
```javascript
const numbers = [1, 2, 3, 4, 5];

// Use reduce to calculate the sum of all numbers
const sum = numbers.reduce((acc, num) => acc + num, 0);

console.log(sum); // Output: 15
```
- **Explanation**: The `reduce` method takes two arguments: a callback function and an initial value (in this case, `0` for the sum).
  - The callback function accumulates the result (`acc` as the accumulator) by adding each number to the accumulated total.

---

## Conclusion
- `map` is used for transforming elements.
- `filter` is used for filtering elements based on conditions.
- `reduce` is used to reduce an array to a single value.

By combining these three methods, you can perform complex operations on arrays efficiently.
```

---

### Explanation:
1. **`map` Example**: Squares each number.
2. **`filter` Example**: Filters out even numbers.
3. **`reduce` Example**: Sums all numbers in the array.

This `README.md` file explains the concepts and provides code examples for `map`, `filter`, and `reduce`. Let me know if you need further modifications! add all this in a readme.md file and give me clean code 
