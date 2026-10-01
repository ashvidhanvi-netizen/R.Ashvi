import { useState } from "react";

const App = () => {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    city: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setStudent({
      ...student,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(student);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h1 className="text-2xl font-bold text-center mb-6">
          Student Registration
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={student.name}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={student.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={student.age}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={student.course}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="Enter City"
          value={student.city}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default App;