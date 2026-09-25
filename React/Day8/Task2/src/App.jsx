import { useState } from "react";

const App = () => {

  const [text, setText] = useState("Hello React");

  return (
    <div className="text-center mt-20 font-sans">

      <h1 className="text-4xl font-bold mb-6">
        {text}
      </h1>

      <button
        className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600"
        onClick={() => setText("Welcome to React")}
      >
        Change Text
      </button>

    </div>
  );
};

export default App;