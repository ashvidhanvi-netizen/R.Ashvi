const App = () => {

  const cities = [
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Pune"
  ];

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">
        Indian Cities
      </h1>

      {cities.map((city, index) => (
        <p
          key={index}
          className="bg-gray-200 p-3 mb-2 rounded"
        >
          {city}
        </p>
      ))}
    </div>
  );
};

export default App;