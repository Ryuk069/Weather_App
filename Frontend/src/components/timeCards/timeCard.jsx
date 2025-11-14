import React from "react";
import "./timeCard.css"; // optional CSS if you have it

function TimeCard({ data }) {
  if (!data || data.length === 0) {
    return <div className="empty-timecard">No forecast data available.</div>;
  }

  return (
    <div className="timecard-container">
      {data.map((item, index) => {
        const rawTime = item.dt_txt.split(" ")[1].slice(0, 5); // "HH:MM"
        let [hours, minutes] = rawTime.split(":").map(Number);
        const meridian = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // convert 0 → 12, 13 → 1, etc.
        const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${meridian}`;

        const temp = (item.main.temp - 273.15).toFixed(0); // convert K → °C
        const condition = item.weather[0].main;

        return (
          <div className="timecard" key={index}>
            <div className="timecard-time">{formattedTime}</div>
            <div className="timecard-temp">{temp}°C</div>
            <div className="timecard-cond">{condition}</div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeCard;
