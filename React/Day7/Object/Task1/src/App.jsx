const App = () => {

  const student = {
    name: "Ashvi",
    age: 21,
    course: "React",
    city: "Chennai"
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Student Details
      </h1>

      <div className="bg-green-200 p-5 rounded-lg w-fit">
        <p className="mb-2">Name: {student.name}</p>
        <p className="mb-2">Age: {student.age}</p>
        <p className="mb-2">Course: {student.course}</p>
        <p>City: {student.city}</p>
      </div>
    </div>
  );
};

export default App;