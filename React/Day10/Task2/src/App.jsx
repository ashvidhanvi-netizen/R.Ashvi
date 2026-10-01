import { useState } from "react";

const App = () => {

  const [employee, setEmployee] = useState({
    employeeName: "",
    employeeId: "",
    department: "",
    role: "",
    salary: ""
  });

  const [submittedEmployee, setSubmittedEmployee] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmittedEmployee(employee);

    setEmployee({
      employeeName: "",
      employeeId: "",
      department: "",
      role: "",
      salary: ""
    });
  };

  return (
    <div className="min-h-screen bg-pink-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h1 className="text-2xl font-bold text-center mb-6">
          Employee Details
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="employeeName"
            placeholder="Employee Name"
            value={employee.employeeName}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={employee.employeeId}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={employee.department}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={employee.role}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={employee.salary}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <button
            type="submit"
            className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700"
          >
            Submit
          </button>

        </form>

        {submittedEmployee && (
          <div className="mt-6 bg-gray-100 p-4 rounded">

            <h2 className="text-xl font-bold mb-3">
              Employee Details
            </h2>

            <p>Name: {submittedEmployee.employeeName}</p>
            <p>ID: {submittedEmployee.employeeId}</p>
            <p>Department: {submittedEmployee.department}</p>
            <p>Role: {submittedEmployee.role}</p>
            <p>Salary: {submittedEmployee.salary}</p>

          </div>
        )}

      </div>

    </div>
  );
};

export default App;