
const App = () => {

  const Student = [
    {
      
      name: "Ashvi",
      age: 21,
      Email : "ashvi@gmail.com",
      course: "React",
      city: "Chennai"
    },
    {
      
      name: "Priya",
      age: 22,
      Email : "priya@gmail.com",
      course: "JavaScript",
      city: "Bangalore"
    },
    {
    
     name: "Rahul",
     age: 20,
     Email : "Rahul@gmail.com",
     course: "Python",
     city: "Hyderabad"
    },
    {
     
     name: "Ananya",
     age: 23,
     Email : "Ananya@gmail.com",
     course: "Java",
     city: "Mumbai"
    },
    {
    
      name: "Karthik",
      age: 21,
      Email : "Karthik@gmail.com",
      course: "Node.js",
      city: "Coimbatore"
    }
  ];

 
return (
  <div className="bg-pink-900 flex justify-between items-center  flex-wrap p-5 gap-5 ">

    {Student.map((e, i) => (

      <div key={i} className="bg-red-200  p-5 m-4 rounded-lg shadow-md">

        <h2>name: {e.name}</h2>
        <p>Age: {e.age}</p>
        <p>Email: {e.Email}</p>
        <p>Course: {e.course}</p>
        <p>City: {e.city}</p>
        <button className="bg-green-500 text-white rounded-lg">click course</button>

      </div>

    ))}

  </div>
);
};


export default App;







