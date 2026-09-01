 const numbers = [10, 20, 30];

        let newArray = [];

        for (let i = 0; i < numbers.length; i++) {

            newArray[i] = numbers[i];

        }

        newArray[newArray.length] = 40;

        console.log(newArray);