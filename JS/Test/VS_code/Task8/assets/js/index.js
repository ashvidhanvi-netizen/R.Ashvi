const students = [
    { name: "Arun", mark: 85 },
    { name: "Bala", mark: 65 },
    { name: "Charan", mark: 90 },
    { name: "Deepak", mark: 70 }
];

for (let i = 0; i < students.length; i++) {
    if (students[i].mark > 75) {
        console.log(students[i].name);
    }
}