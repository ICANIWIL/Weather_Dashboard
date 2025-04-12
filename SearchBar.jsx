"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city)
      setCity("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 text-gray-400" size={18} />
        <button
          type="submit"
          className="absolute right-2 px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </form>
  )
}
