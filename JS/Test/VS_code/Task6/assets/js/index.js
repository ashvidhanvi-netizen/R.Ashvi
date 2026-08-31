const numbers = [10, 15, 20, 25, 30, 35, 40];

let total = 0;

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 !== 0) {
        console.log(numbers[i]);
        total = total + numbers[i];
    }
}

console.log("Total:", total);