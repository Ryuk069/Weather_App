import { useState, useMemo } from "react";
import "./dayCards.css";

function DayCards({ data, onSelectDayData }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function getDailySummaries(dataList) {
    const dailyData = {};
    dataList.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (!dailyData[date]) dailyData[date] = [];
      dailyData[date].push(item);
    });

    const summaries = Object.entries(dailyData).map(([date, items]) => {
      const avgTemp =
        items.reduce((sum, curr) => sum + (curr.main?.temp ?? 0), 0) / items.length;

      const conditionCount = {};
      items.forEach(i => {
        const condition = i.weather?.[0]?.main || "Unknown";
        conditionCount[condition] = (conditionCount[condition] || 0) + 1;
      });

      const mainCondition = Object.entries(conditionCount).sort(
        (a, b) => b[1] - a[1]
      )[0][0];

      const dayName = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      });

      return {
        date,
        dayName,
        avgTemp: (avgTemp - 273.15).toFixed(0), // convert to °C early
        condition: mainCondition,
      };
    });

    return summaries.slice(0, 5);
  }

  // Memoize to prevent unnecessary recalculation
  const summaries = useMemo(() => getDailySummaries(data || []), [data]);

  function handleSelect(index, day) {
    setSelectedIndex(index);
    let selectedDayItems;

    if (index === 0) {
      // ✅ "Today" → next 6 forecast slots from now
      const now = new Date();
      selectedDayItems = data
        .filter(item => new Date(item.dt_txt) >= now)
        .slice(0, 6);
    } else {
      // ✅ Other days → forecast entries matching the date
      selectedDayItems = data.filter(item => item.dt_txt.startsWith(day.date));

      // 🩹 If last day has <6 entries → take last 6 entries overall
      if (index === summaries.length - 1 && selectedDayItems.length < 6) {
        selectedDayItems = data.slice(-6);
      } else {
        selectedDayItems = selectedDayItems.slice(0, 6);
      }
    }

    // Send selected day's data to parent
    onSelectDayData(selectedDayItems);
  }

  return (
    <>
      {summaries.map((day, index) => (
        <div
          key={index}
          className={`day-card ${selectedIndex === index ? "selected" : ""}`}
          onClick={() => handleSelect(index, day)}
        >
          <div className="day-name">
            {index === 0 ? "Today" : day.dayName.slice(0, 3)}
          </div>
          <div className="day-temp">{day.avgTemp}°</div>
          <div className="day-condition">{day.condition}</div>
        </div>
      ))}
    </>
  );
}

export default DayCards;
