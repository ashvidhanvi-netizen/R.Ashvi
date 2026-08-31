//normal function

function add(a, b) {
    return a + b;
}

function square(n) {
    return n * n;
}

//arrow function - Explicit return

const number = (a,b) => {
    return a + b ;
};

console.log(number(10,20));

//Arrow function — Implicit return

const value =(a,b) => a+b ;
console.log(value(10,20));


//Square — Explicit return

const multiply = (n) => {
    return n*n
}
console.log(multiply(5));

//Square — Explicit return

const explicit = (n) => n*n;
console.log(explicit(5));



