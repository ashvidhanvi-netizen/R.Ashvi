const App = () => {
  const languages = ["JavaScript", "Python", "Java", "C++", "React"];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">
        Programming Languages
      </h1>

      {languages.map((language, index) => (
        <p
          key={index}
          className="bg-gray-200 p-3 mb-2 rounded"
        >
          {language}
        </p>
      ))}
    </div>
  );
};

export default App;