var name = "Ravi";
var age = 25;

var student = {
    name: name,
    age: age
};

var greet = function(name) {
    return "Hello " + name;
};

console.log(greet(name));

// ES6+ Syntax

const studentName = "Priya";
const studentAge = 22;

const studentDetails = {
    studentName,
    studentAge
};

const welcomeMessage = studentName => `Hello ${studentName}`;

console.log(welcomeMessage(studentName));