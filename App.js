"use client"

import { useState, useEffect } from "react"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import ForecastSection from "./components/ForecastSection"
import ErrorMessage from "./components/ErrorMessage"
import LoadingSpinner from "./components/LoadingSpinner"
import axios from "axios"

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [recentSearches, setRecentSearches] = useState([])

  useEffect(() => {
    // Load recent searches from localStorage on component mount
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  const handleSearch = async (city) => {
    setLoading(true)
    setError("")

    try {
      // Get current weather
      const weatherResponse = await axios.get(`/api/weather?city=${city}`)
      setWeatherData(weatherResponse.data)

      // Get forecast
      const forecastResponse = await axios.get(`/api/forecast?city=${city}`)
      setForecast(forecastResponse.data.list.slice(0, 8)) // Get next 24 hours (8 x 3-hour intervals)

      // Update recent searches
      updateRecentSearches(city)
    } catch (err) {
      console.error("Error fetching weather data:", err)
      setError(err.response?.data?.message || "Failed to fetch weather data. Please try again.")
      setWeatherData(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  const updateRecentSearches = (city) => {
    const updatedSearches = [city, ...recentSearches.filter((item) => item.toLowerCase() !== city.toLowerCase())].slice(
      0,
      5,
    ) // Keep only the 5 most recent searches

    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Weather Dashboard</h1>
          <p className="text-gray-600 mt-2">Get real-time weather information for any city</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {recentSearches.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {recentSearches.map((city, index) => (
              <button
                key={index}
                onClick={() => handleSearch(city)}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50"
              >
                {city}
              </button>
            ))}
          </div>
        )}

        <ErrorMessage message={error} />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {weatherData && <WeatherCard weatherData={weatherData} />}
            {forecast && <ForecastSection forecast={forecast} />}
          </>
        )}
      </div>
    </div>
  )
}

export default App
