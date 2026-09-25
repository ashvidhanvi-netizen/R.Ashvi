const App = () => {

  const students = [
    {
      id: 1,
      name: "Ashvi",
      age: 21,
      course: "React"
    },
    {
      id: 2,
      name: "Priya",
      age: 22,
      course: "JavaScript"
    },
    {
      id: 3,
      name: "Rahul",
      age: 23,
      course: "Python"
    },
    {
      id: 4,
      name: "Kavin",
      age: 21,
      course: "Java"
    }
  ];

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Student Details
      </h1>

      {students.map((student) => (
        <div
          key={student.id}
          className="bg-violet-300 p-5 mb-4 rounded-lg w-fit"
        >
          <p className="mb-2">Name: {student.name}</p>
          <p className="mb-2">Age: {student.age}</p>
          <p>Course: {student.course}</p>
        </div>
      ))}
    </div>
  );
};

export default App;