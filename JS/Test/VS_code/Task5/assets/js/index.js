const numbers = [45, 12, 89, 34, 67, 90, 23];

let highest = numbers[0];

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > highest) {
        highest = numbers[i];
    }
}

console.log(highest);