//var

console.log(a);
var a = 10;

//let

try {
    console.log(b);
} catch (error) {
    console.log("Error: let cannot be accessed before initialization");
}

let b = 20;

// const

try {
    console.log(c);
} catch (error) {
    console.log("Error: const cannot be accessed before initialization");
}

const c = 30;

// Function Declaration

sayHello();

function sayHello() {
    console.log("Hello from function declaration");
}
