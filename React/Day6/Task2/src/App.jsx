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
        backgroundColor: "#7baecf",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <h1>Student Details</h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          textAlign: "center"
        }}
      >
        <p>Name: {student.name}</p>
        <p>Age: {student.age}</p>
        <p>Course: {student.course}</p>
        <p>City: {student.city}</p>
      </div>

    </div>
  );
};

export default App;