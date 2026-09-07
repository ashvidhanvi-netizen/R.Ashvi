const process =(number,cb)=> {
    console.log("hi");
    let result = number*2;
    cb(result)
   
    
}
const another = (value) =>{
    console.log(value);
    
}
process(20,another);
















