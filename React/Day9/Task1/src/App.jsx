import { useState } from "react"

const App = () => {

  const [name, setName] = useState("")

  const handleChange = (e) => {
    setName(e.target.value)
  }

  return (
    <div className="w-100 mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Name Input
      </h2>

      <input
        type="text"
        onChange={handleChange}
        placeholder="Enter your name"
        className="w-full p-3 border border-gray-400 rounded-lg mb-4"
      />

      <p className="text-lg text-gray-700">
        Name: {name}
      </p>

    </div>
  )
}

export default App