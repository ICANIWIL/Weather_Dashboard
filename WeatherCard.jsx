import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from "lucide-react"

export default function WeatherCard({ weatherData }) {
  if (!weatherData) return null

  const { name, main, weather, wind, sys } = weatherData

  // Get appropriate weather icon
  const getWeatherIcon = (iconCode) => {
    const code = iconCode.toLowerCase()
    if (code.includes("rain") || code.includes("drizzle")) {
      return <CloudRain className="w-16 h-16 text-blue-400" />
    } else if (code.includes("cloud")) {
      return <Cloud className="w-16 h-16 text-gray-400" />
    } else if (code.includes("clear")) {
      return <Sun className="w-16 h-16 text-yellow-400" />
    } else {
      return <Cloud className="w-16 h-16 text-gray-400" />
    }
  }

  // Format date
  const formatDate = () => {
    const date = new Date()
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-500">{formatDate()}</p>
            <p className="text-gray-600 mt-1">{weather[0].description}</p>
          </div>
          <div className="flex flex-col items-center">
            {getWeatherIcon(weather[0].main)}
            <span className="text-4xl font-bold text-gray-800 mt-2">{Math.round(main.temp)}°C</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Thermometer className="w-5 h-5 text-red-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Feels Like</p>
              <p className="font-medium">{Math.round(main.feels_like)}°C</p>
            </div>
          </div>
          <div className="flex items-center">
            <Droplets className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="font-medium">{main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <Wind className="w-5 h-5 text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Wind Speed</p>
              <p className="font-medium">{wind.speed} m/s</p>
            </div>
          </div>
          <div className="flex items-center">
            <Thermometer className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Min/Max</p>
              <p className="font-medium">
                {Math.round(main.temp_min)}°/{Math.round(main.temp_max)}°
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
