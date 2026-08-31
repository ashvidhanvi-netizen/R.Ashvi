

const total = (...numbers) => {
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        sum = sum + numbers[i];
    }

    return sum;
};

console.log(total(10, 20, 30, 40));

