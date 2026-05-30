import { config as configDotenv } from "dotenv";
import express from "express";
import cors from "cors";

configDotenv();

const app = express();
const apikey = process.env.api;

app.use(cors({
  origin: [
    'https://weather-app-nine-silk-56.vercel.app/'
  ]
})
);

async function fetchWeather(city) {
  try {
    console.log(`Fetching forecast for: ${city}`);

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`
    );
    const forecastData = await forecastRes.json();

    if (forecastRes.status === 404 || forecastData.cod === "404") {
      return { error: `City "${city}" not found`, status: 404 };
    }

    if (!forecastRes.ok) {
      throw new Error(`Failed to fetch forecast: ${forecastRes.status}`);
    }

    console.log(`Weather data fetched for ${city}`);
    return forecastData;
  } catch (error) {
    console.error("Error in fetchWeather:", error.message);
    return { error: error.message, status: 500 };
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/",(req,res) => {
  console.log("hello");
})

app.get("/api/weather/:city", async (req, res) => {
  const city = req.params.city.trim().toLowerCase();
  const raw = await fetchWeather(city);

  if (raw.error) {
    return res.status(raw.status || 400).json({ error: raw.error });
  }

  // Remove the 0th index entry (first slot)
  const trimmedList = raw.list.slice(1);

  // Group by date
  const grouped = {};
  trimmedList.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  const entries = Object.entries(grouped);

  const daily = entries.slice(0, 5).map(([date, items], index, arr) => {
    const avg = (arr) => arr.reduce((sum, v) => sum + v, 0) / arr.length;

    const avgTemp = +avg(items.map((i) => i.main.temp)).toFixed(2);
    const avgFeelsLike = +avg(items.map((i) => i.main.feels_like)).toFixed(2);
    const avgHumidity = Math.round(avg(items.map((i) => i.main.humidity)));
    const avgWind = +avg(items.map((i) => i.wind.speed)).toFixed(2);

    // Most frequent condition + icon
    const conditionCount = {};
    items.forEach((i) => {
      const key = i.weather[0].main + "|" + i.weather[0].icon;
      conditionCount[key] = (conditionCount[key] || 0) + 1;
    });
    const [conditionKey] = Object.entries(conditionCount).sort(
      (a, b) => b[1] - a[1]
    )[0];
    const [condition, icon] = conditionKey.split("|");

    // Hourly slots (ensure 6)
    let hourly = items.slice(0, 6);
    if (hourly.length < 6) {
      const nextDayItems = arr[index + 1]?.[1] || [];
      hourly = hourly.concat(nextDayItems.slice(0, 6 - hourly.length));
    }

    hourly = hourly.map((i) => ({
      time: i.dt_txt,
      temp: +i.main.temp.toFixed(2),
      feels_like: +i.main.feels_like.toFixed(2),
      humidity: i.main.humidity,
      wind: i.wind.speed,
      condition: i.weather[0].main,
      description: i.weather[0].description,
      icon: i.weather[0].icon,
    }));

    return {
      date,
      avgTemp,
      avgFeelsLike,
      avgHumidity,
      avgWind,
      condition,
      icon,
      hourly,
    };
  });

  // await wait(3000)
  res.json({ city: raw.city.name, daily });
});

app.listen(3000, () => console.log("Server running on port 3000"));
