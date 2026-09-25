const App = () => {

  const employees = [
    {
      id: 1,
      name: "Ashvi",
      department: "Frontend",
      salary: 45000
    },
    {
      id: 2,
      name: "Priya",
      department: "Backend",
      salary: 50000
    },
    {
      id: 3,
      name: "Rahul",
      department: "Testing",
      salary: 40000
    },
    {
      id: 4,
      name: "Kavin",
      department: "UI/UX",
      salary: 42000
    }
  ];

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Employee Details
      </h1>

      <table className="border-collapse border border-gray-400">
        <thead>
          <tr className="bg-violet-400">
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Department</th>
            <th className="border border-gray-400 px-4 py-2">Salary</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-yellow-400 px-4 py-2">
                {employee.id}
              </td>

              <td className="border border-yellow-400 px-4 py-2">
                {employee.name}
              </td>

              <td className="border border-yellow-400 px-4 py-2">
                {employee.department}
              </td>

              <td className="border border-yellow-400 px-4 py-2">
                ₹{employee.salary}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;