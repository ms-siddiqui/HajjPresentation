import { RequestHandler } from "express";

export const handleWeather: RequestHandler = async (req, res) => {
  try {
    const { location } = req.query;
    const apiKey = "13484b7d7f764376b4381040252310";

    if (!location) {
      return res.status(400).json({ error: "Location parameter required" });
    }

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
    );

    if (!response.ok) {
      throw new Error(`WeatherAPI returned ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Weather API error:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
