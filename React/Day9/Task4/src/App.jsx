import { useState } from "react"

const App = () => {

  const [search, setSearch] = useState("")

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="w-100 mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Search Input
      </h2>

      <input
        type="text"
        onChange={handleChange}
        placeholder="Search"
        className="w-full p-3 border border-gray-400 rounded-lg mb-4"
      />

      <p className="text-lg text-gray-700">
        You are searching for: {search}
      </p>

    </div>
  )
}

export default App