import { useState } from "react";

const App = () => {

  const [count, setCount] = useState(0);

  return (
    <div className="text-center mt-20 font-sans">

      <h1 className="text-4xl font-bold mb-6">
        Counter
      </h1>

      <h2 className="text-5xl font-bold mb-6">
        {count}
      </h2>

      <div className="flex justify-center gap-4">

        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>

        <button
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>

        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          onClick={() => setCount(0)}
        >
          Reset
        </button>

      </div>

    </div>
  );
};

export default App;