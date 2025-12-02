import { useState } from "react";
import { kelvinToCelsius } from "../utils/constants";

function DayCards({ data, onSelectDayData }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleSelect(index, day) {
    setSelectedIndex(index);
    // Send the whole day object (with hourly slots) to parent
    onSelectDayData(day);
  }

  return (
    <div className="w-screen md:w-7/10 lg:w-10/10 flex md:items-center justify-center md:justify-center gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide">
      {data?.map((day, index) => (
        <div
          key={day.date}
          onClick={() => handleSelect(index, day)}
          className={`flex flex-col items-center min-w-[90px] px-4 py-3 rounded-xl cursor-pointer
            border transition-all duration-300 select-none
            ${selectedIndex === index
              ? "bg-blue-600 text-white border-blue-600 scale-105 shadow-md"
              : "black text-gray-800 border-gray-200 hover:bg-blue-100/60"}`}
        >
          <div className="text-sm font-medium">
            {index === 0
              ? "Today"
              : new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
          </div>

          <div className="text-xl font-semibold mt-1">
            {kelvinToCelsius(day.avgTemp)}°
          </div>

          <div className="text-xs mt-1 opacity-80 capitalize">
            {day.condition}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DayCards;