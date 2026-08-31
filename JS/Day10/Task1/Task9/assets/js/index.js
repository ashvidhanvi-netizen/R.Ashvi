

const numbers = [10, 25, 30, 45, 50, 65];


// 1. Find numbers greater than 30
const greaterThan30 = numbers.filter
(number => number > 30);

console.log("Numbers greater than 30:", greaterThan30);


// 2. Find the first number greater than 40
const firstGreaterThan40 = numbers.find
(number => number > 40);

console.log("First number greater than 40:", firstGreaterThan40);


// 3. Check whether 50 exists
const check50 = numbers.includes(50);

console.log("Does 50 exist:", check50);


// 4. Create a new array containing doubled values
const doubledNumbers = numbers.map
(number => number * 2);

console.log("Doubled values:", doubledNumbers);