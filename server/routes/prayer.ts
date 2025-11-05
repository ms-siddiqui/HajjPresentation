import { RequestHandler } from "express";

export const handlePrayerTimes: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.aladhan.com/v1/timingsByCity?city=Makkah&country=Saudi%20Arabia&method=4"
    );

    if (!response.ok) {
      throw new Error(`Aladhan API returned ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Prayer times API error:", error);
    res.status(500).json({ error: "Failed to fetch prayer times" });
  }
};
