import { useState } from "react";

const App = () => {

  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="text-center mt-20 font-sans">

      <h1 className="text-4xl font-bold mb-6">
        Hide and Show
      </h1>

      {isVisible && (
        <p className="text-xl mb-6">
          This is the content that can be hidden and shown.
        </p>
      )}

      <button
        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide" : "Show"}
      </button>

    </div>
  );
};

export default App;