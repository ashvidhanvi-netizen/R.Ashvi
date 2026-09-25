const App = () => {

  const employee = {
    name: "Rahul",
    role: "Frontend Developer",
    salary: 45000,
    location: "Chennai"
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Employee Details
      </h1>

      <div className="bg-red-200 p-5 rounded-lg w-fit">
        <p className="mb-2">Name: {employee.name}</p>
        <p className="mb-2">Role: {employee.role}</p>
        <p className="mb-2">Salary: ₹{employee.salary}</p>
        <p>Location: {employee.location}</p>
      </div>
    </div>
  );
};

export default App;