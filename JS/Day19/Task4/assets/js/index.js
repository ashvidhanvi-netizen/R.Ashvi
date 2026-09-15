const promise = new Promise((resolve) => {
    resolve("Data received");
});

async function getData() {
    const result = await promise;
    console.log(result);
}

getData();