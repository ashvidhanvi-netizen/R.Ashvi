let students = [
    { name: "Ashvi", mark: 85 },
    { name: "Priya", mark: 90 },
    { name: "Kavi", mark: 78 }
];

let target = "Priya";

for (let a = 0; a <= students.length; a++) {

    if (students[a].name === target) {
        console.log("Name: " + students[a].name);
        console.log("Mark: " + students[a].mark);
        break;
    }

}