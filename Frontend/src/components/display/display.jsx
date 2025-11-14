import { useState, useEffect } from "react";
import Search from "../search/search";
import DateDisplay from "../date/date";
import TempStats from "../tempStats/tempStats";
import DayCards from "../dayCards/dayCards.jsx";
import TimeCard from "../timeCards/timeCard.jsx";
import "./display.css";

function Display() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("delhi");
  const [time, setTime] = useState(new Date());
  const [selectedDayData, setSelectedDayData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/weather/${city}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log(data);
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }

    fetchData();
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  function formatTime() {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let meridiam = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");

    return `${hours}:${minutes} ${meridiam}`;
  }

  function getGreeting() {
    const hours = time.getHours();
    if (hours >= 5 && hours < 12) return "Good Morning ☀️";
    if (hours >= 12 && hours < 17) return "Good Afternoon 🌤️";
    if (hours >= 17 && hours < 21) return "Good Evening 🌆";
    return "Good Night 🌙";
  }

  // ✅ Helper to get today’s data as default (first 6 entries)
  function getTodayData() {
    if (!weather?.list) return null;
    return weather.list.slice(0, 6);
  }

  // ✅ Choose which data to send to TimeCard
  const timeCardData = selectedDayData || getTodayData();

  return (
    <div className="display">
      <div className="weather">
        <div className="nav">
          <Search onSearch={setCity} />
          <DateDisplay />
        </div>

        <div className="tempStats">
          <TempStats
            temp={weather?.list[0].main.temp}
            humidity={weather?.list[0].main.humidity}
            wind={weather?.list[0].wind.speed}
            condition={weather?.list[0].weather[0].description}
            small={false}
          />
        </div>

        {/* Day cards list (each can update selectedDayData) */}
        <div className="cards">
          <DayCards data={weather?.list} onSelectDayData={setSelectedDayData} />
        </div>
      </div>

      <div className="time-field">
        <div className="time-content">
          <div className="greeting">{getGreeting()}</div>
          <div className="clock">{formatTime()}</div>
        </div>

        <div className="mini-tempStats">
          <TempStats
            temp={weather?.list[0].main.temp}
            humidity={weather?.list[0].main.humidity}
            wind={weather?.list[0].wind.speed}
            feel={weather?.list[0].main.feels_like}
            small={true}
            condition={weather?.list[0].weather[0].description}
          />
        </div>

        {/* TimeCard — shows today’s forecast by default, or selected day */}
        <div className="time-card">
          <div className="hrs">
            Hourly Forecast
          </div>
          <TimeCard data={timeCardData} />
        </div>
      </div>
    </div>
  );
}

export default Display;
