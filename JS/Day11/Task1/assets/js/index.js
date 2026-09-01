const processnumbers =(number,cb) => {

    console.log("This is processnumber");
    let result = number *2;

      cb(result)  
}


  const anothernumber =(value) => {
    console.log("This is number:",value
        
    )

  }

     processnumbers(10, anothernumber)
