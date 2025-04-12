const express = require("express");
const axios = require("axios");
const router = express.Router();

// Define the weather route
router.get("/weather", async (req, res) => {
  const city = req.query.city;

  // Check if city is provided
  if (!city) {
    return res.status(400).json({ message: "City name is required" });
  }

  try {
    // Make a request to the OpenWeatherMap API
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY, // Make sure this is in your .env file
        units: "metric", // For temperature in Celsius
      },
    });

    // Send back the weather data as response
    res.json(weatherResponse.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

module.exports = router;
