import { Cloud, CloudRain, Sun } from "lucide-react"

export default function ForecastSection({ forecast }) {
  if (!forecast || !forecast.length) return null

  // Get appropriate weather icon
  const getWeatherIcon = (iconCode) => {
    const code = iconCode.toLowerCase()
    if (code.includes("rain") || code.includes("drizzle")) {
      return <CloudRain className="w-8 h-8 text-blue-400" />
    } else if (code.includes("cloud")) {
      return <Cloud className="w-8 h-8 text-gray-400" />
    } else if (code.includes("clear")) {
      return <Sun className="w-8 h-8 text-yellow-400" />
    } else {
      return <Cloud className="w-8 h-8 text-gray-400" />
    }
  }

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Forecast</h3>
        <div className="flex overflow-x-auto pb-2 space-x-4">
          {forecast.map((item, index) => (
            <div key={index} className="flex flex-col items-center min-w-[80px]">
              <p className="text-sm text-gray-500">{formatTime(item.dt)}</p>
              {getWeatherIcon(item.weather[0].main)}
              <p className="font-medium mt-1">{Math.round(item.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
