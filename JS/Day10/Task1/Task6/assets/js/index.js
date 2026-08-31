class Student {

    constructor(name, age, mark) {
        this.name = name;
        this.age = age;
        this.mark = mark;
    }

    displayDetails() {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Mark: ${this.mark}`);
    }
}

const student1 = new Student("Ravi", 25, 85);
const student2 = new Student("Priya", 22, 90);

student1.displayDetails();
student2.displayDetails();