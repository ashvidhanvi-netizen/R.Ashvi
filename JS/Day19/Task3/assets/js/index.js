const promise = new Promise((resolve, reject) => {
    resolve("Promise successful");
});

promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Promise completed");
    });