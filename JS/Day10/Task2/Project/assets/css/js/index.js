

// 1. Even or Odd

function checkEvenOdd() {

    const number = Number(
        document.getElementById("evenInput").value
    );

    const result =
        number % 2 === 0 ? "Even Number" : "Odd Number";

    document.getElementById("evenOutput").textContent = result;
}


// 2. Positive or Negative

function checkPositiveNegative() {

    const number = Number(
        document.getElementById("positiveInput").value
    );

    let result;

    if (number > 0) {
        result = "Positive Number";
    }
    else if (number < 0) {
        result = "Negative Number";
    }
    else {
        result = "Zero";
    }

    document.getElementById("positiveOutput").textContent = result;
}


// 3. Largest of Two Numbers

function findLargestTwo() {

    const numberOne =
        Number(document.getElementById("numberOne").value);

    const numberTwo =
        Number(document.getElementById("numberTwo").value);

    const largest = Math.max(numberOne, numberTwo);

    document.getElementById("largestTwoOutput").textContent =
        `Largest Number: ${largest}`;
}


// 4. Largest of Three Numbers

function findLargestThree() {

    const numberOne =
        Number(document.getElementById("threeOne").value);

    const numberTwo =
        Number(document.getElementById("threeTwo").value);

    const numberThree =
        Number(document.getElementById("threeThree").value);

    const largest =
        Math.max(numberOne, numberTwo, numberThree);

    document.getElementById("largestThreeOutput").textContent =
        `Largest Number: ${largest}`;
}


// 5. Factorial

function calculateFactorial() {

    const number =
        Number(document.getElementById("factorialInput").value);

    let factorial = 1;

    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }

    document.getElementById("factorialOutput").textContent =
        `Factorial: ${factorial}`;
}


// 6. Reverse String

function reverseString() {

    const text =
        document.getElementById("reverseInput").value;

    const reversed =
        text.split("").reverse().join("");

    document.getElementById("reverseOutput").textContent =
        `Reversed: ${reversed}`;
}


// 7. Palindrome

function checkPalindrome() {

    const text =
        document.getElementById("palindromeInput").value;

    const reversed =
        text.split("").reverse().join("");

    if (text.toLowerCase() === reversed.toLowerCase()) {

        document.getElementById("palindromeOutput").textContent =
            "It is a Palindrome";

    } else {

        document.getElementById("palindromeOutput").textContent =
            "It is not a Palindrome";
    }
}


// 8. Sum of Array

function calculateArraySum() {

    const numbers = [10, 20, 30, 40];

    const sum =
        numbers.reduce((total, number) => total + number, 0);

    document.getElementById("sumOutput").textContent =
        `Sum: ${sum}`;
}


// 9. Maximum Number

function findMaximum() {

    const numbers = [10, 50, 30, 90, 20];

    const maximum =
        Math.max(...numbers);

    document.getElementById("maximumOutput").textContent =
        `Maximum: ${maximum}`;
}


// 10. Count Even Numbers

function countEvenNumbers() {

    const numbers = [10, 15, 20, 25, 30, 35];

    const evenNumbers =
        numbers.filter(number => number % 2 === 0);

    document.getElementById("countEvenOutput").textContent =
        `Even Numbers: ${evenNumbers.join(", ")} | Count: ${evenNumbers.length}`;
}



// ========================================
// 10 ES6+ TOPICS
// ========================================


// 1. let and const

function showLetConst() {

    const name = "Ashvi";
    let age = 22;

    age = 23;

    document.getElementById("letConstOutput").textContent =
        `Name: ${name}, Age: ${age}`;
}


// 2. Arrow Function

function showArrowFunction() {

    const add = (a, b) => a + b;

    const result = add(10, 20);

    document.getElementById("arrowOutput").textContent =
        `10 + 20 = ${result}`;
}


// 3. Template Literal

function showTemplateLiteral() {

    const name = "Ashvi";
    const course = "Full Stack Development";

    const message =
        `My name is ${name}. I am learning ${course}.`;

    document.getElementById("templateOutput").textContent =
        message;
}


// 4. Default Parameter

function showDefaultParameter() {

    function studentDetails(name, city = "Chennai") {

        return `Name: ${name}, City: ${city}`;

    }

    const result = studentDetails("Ashvi");

    document.getElementById("defaultOutput").textContent =
        result;
}


// 5. Destructuring

function showDestructuring() {

    const numbers = [10, 20, 30];

    const [first, second, third] = numbers;

    document.getElementById("destructureOutput").textContent =
        `First: ${first}, Second: ${second}, Third: ${third}`;
}


// 6. Rest Parameter

function showRest() {

    function addNumbers(...numbers) {

        return numbers.reduce(
            (total, number) => total + number,
            0
        );

    }

    const result =
        addNumbers(10, 20, 30, 40);

    document.getElementById("restOutput").textContent =
        `Sum using Rest: ${result}`;
}


// 7. Spread Syntax

function showSpread() {

    const numbers = [10, 20, 30];

    const newNumbers =
        [...numbers, 40, 50];

    document.getElementById("spreadOutput").textContent =
        `New Array: ${newNumbers.join(", ")}`;
}


// 8. Class

function showClass() {

    class Student {

        constructor(name, age) {

            this.name = name;
            this.age = age;

        }

        displayDetails() {

            return `Name: ${this.name}, Age: ${this.age}`;

        }
    }

    const student =
        new Student("Ravi", 25);

    document.getElementById("classOutput").textContent =
        student.displayDetails();
}


// 9. Promise

function showPromise() {

    document.getElementById("promiseOutput").textContent =
        "Loading...";

    const dataPromise =
        new Promise((resolve) => {

            setTimeout(() => {

                resolve("Data Loaded");

            }, 2000);

        });


    dataPromise.then((result) => {

        document.getElementById("promiseOutput").textContent =
            result;

    });
}


// 10. Optional Chaining + Nullish Coalescing

function showOptionalChaining() {

    const user = {
        name: "Ravi"
    };

    const city =
        user?.city ?? "City Not Available";

    document.getElementById("optionalOutput").textContent =
        city;
}