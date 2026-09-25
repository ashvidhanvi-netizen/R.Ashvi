const App = () => {

  const courses = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js"
  ];

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Available Courses
      </h1>

      {courses.map((course, index) => (
        <div
          key={index}
          className="bg-pink-200 p-4 mb-3 rounded-lg"
        >
          <h3 className="text-xl font-semibold">
            {course}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default App;