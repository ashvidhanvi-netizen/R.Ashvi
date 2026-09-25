import { useState } from "react"

const App = () => {

  const [age, setAge] = useState("")
  const [showAge, setShowAge] = useState("")

  const handleChange = (e) => {
    setAge(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (age === "") {
      setShowAge("Age is required")
    }
    else {
      setShowAge(age)
      setAge("")
    }
  }

  return (
    <div className="w-100 mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Age Validation
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          value={age}
          onChange={handleChange}
          placeholder="Enter your age"
          className="w-full p-3 border border-gray-400 rounded-lg mb-4"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>

      </form>

      <p className="mt-5 text-lg text-red-600">
        {showAge}
      </p>

    </div>
  )
}

export default App