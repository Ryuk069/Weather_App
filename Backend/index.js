dotenv = require('dotenv').config();

const express = require('express');
const cors = require('cors');


const app = express();


const apikey = process.env.api;

app.use(cors({
  origin: 'http://localhost:5173'
}));

async function fetchWeather(city) {
  try {
    console.log(`🌍 Fetching coordinates for: ${city}`);


    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apikey}`
    );

    if (!geoRes.ok) {
      throw new Error(`❌ Failed to fetch coordinates: ${geoRes.status}`);
    }

    const geoData = await geoRes.json();
    if (!geoData.length) {
      throw new Error(`⚠️ City "${city}" not found`);
    }

    const { lat, lon } = geoData[0];
    console.log(`📍 Found: ${city} → Lat: ${lat}, Lon: ${lon}`);

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`
    );

    if (!forecastRes.ok) {
      throw new Error(`❌ Failed to fetch forecast: ${forecastRes.status}`);
    }

    const forecastData = await forecastRes.json();
    console.log(`✅ Weather data fetched for ${city}`);

    return forecastData;
  } catch (error) {
    console.error("🚨 Error in fetchWeather:", error.message);
    return { error: error.message };
  }
}


app.get('/weather/:city', async (req, res) => {
  const city = req.params.city.trim().toLowerCase();
  const data = await fetchWeather(city);
  
  
  if (data.error) {
    return res.status(400).json({ error: data.error });
  }

  res.json(data);
});


app.listen(3000, () => console.log("Server running on port 3000"));
