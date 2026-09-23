const Employee = (props) => {

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "15px",
        textAlign: "center"
      }}
    >
      <h2>Employee Details</h2>

      <p>Name: {props.employee.name}</p>
      <p>Role: {props.employee.role}</p>
      <p>Salary: ₹{props.employee.salary}</p>
      <p>City: {props.employee.city}</p>
    </div>
  );
};


const App = () => {

  const employee = {
    name: "Ashvi",
    role: "Frontend Developer",
    salary: 40000,
    city: "Chennai"
  };

  return (
    <div
      style={{
        backgroundColor: "#0f7a34",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <h1>Employee Details</h1>

      <Employee employee={employee} />

    </div>
  );
};

export default App;