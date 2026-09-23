
const App = () => {

  const student = {
    name: "Ashvi",
    age: 21,
    course: "React",
    city: "Chennai"
  };

  return (
    <div
      style={{
        backgroundColor: "#ad8335",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "15px",
          width: "300px"
        }}
      >

        <h2>Student Details</h2>

        <p>Name: {student.name}</p>
        <p>Age: {student.age}</p>
        <p>Course: {student.course}</p>
        <p>City: {student.city}</p>

      </div>

    </div>
  );
};

export default App;