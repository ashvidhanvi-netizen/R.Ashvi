import { useState } from "react"

const App = () => {

  const [email, setEmail] = useState("")
  const [showEmail, setShowEmail] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setShowEmail(email)
  }

  return (
    <div className="w-100 mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Email Submit
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-400 rounded-lg mb-4"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>

      </form>

      <p className="mt-5 text-lg text-gray-700">
        Email: {showEmail}
      </p>

    </div>
  )
}

export default App