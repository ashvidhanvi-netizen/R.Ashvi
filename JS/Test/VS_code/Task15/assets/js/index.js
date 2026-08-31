const users = [
    {
        name: "Ravi",
        marks: [80, 90, 85],
        address: {
            city: "Chennai"
        }
    },
    {
        name: "Kumar",
        marks: [60, 70, 75]
    }
];

for (const user of users) {
    const { name, marks, address } = user;

    let total = 0;

    for (const mark of marks) {
        total = total + mark;
    }

    const city = address?.city ?? "City Not Available";

    console.log("Name:", name);
    console.log("City:", city);
    console.log("Total Marks:", total);
}