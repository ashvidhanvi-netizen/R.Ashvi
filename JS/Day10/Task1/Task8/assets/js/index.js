

const user = {
    name: "Ravi"
};

// Safely access the city
const city = user?.city ?? "City Not Available";

console.log("Name:", user.name);
console.log("City:", city);