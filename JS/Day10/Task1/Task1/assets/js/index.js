var name = "Priya";
var name = "Divya";

console.log(name);

let age = 20;
    age = 21;

console.log(age);

const course = "Fullstack";

console.log(course);


//scope

function number() {

   var a = 5;

    if (true ){
        let b = 10;
        const c = 15;
    }
    console.log(a);
    
}
number();

