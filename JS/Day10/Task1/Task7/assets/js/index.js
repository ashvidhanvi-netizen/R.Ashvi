// Promise with .then()

const dataPromise = new Promise((resolve) => {

    setTimeout(() => {
        resolve("Data Loaded");
    }, 2000);

});

dataPromise.then((result) => {
    console.log(result);
});


// Promise with async/await

const valuePromise = new Promise((resolve) => {

    setTimeout(() => {
        resolve("Data Loaded");
    }, 2000);

});

async function loadData() {

    const result = await valuePromise;

    console.log(result);
}

loadData();