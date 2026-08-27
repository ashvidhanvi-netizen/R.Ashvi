let employees = [
    { name: "Ashvi", salary: 35000 },
    { name: "Priya", salary: 45000 },
    { name: "Kavi", salary: 50000 },
    { name: "Ravi", salary: 30000 }
];

for (let a = 0; a <= employees.length; a++) {

    if (employees[a].salary > 40000) {
        console.log(employees[a].name);
        console.log(employees[a].salary);
    }

}