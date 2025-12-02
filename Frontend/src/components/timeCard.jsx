import { kelvinToCelsius } from "../utils/constants";

function TimeCard({ data, selectedIndex, onSelectHour }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-slate-400">
        No forecast data available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5 p-3 cursor-pointer">
      {data.map((item, index) => {
        // Format time from "YYYY-MM-DD HH:mm:ss"
        const rawTime = item.time.split(" ")[1].slice(0, 5);
        let [hours, minutes] = rawTime.split(":").map(Number);
        const meridian = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        const formattedTime = `${hours}:${minutes
          .toString()
          .padStart(2, "0")} ${meridian}`;

        // Kelvin → Celsius for display
        const temp = kelvinToCelsius(item.temp);

        return (
          <div
            key={index}
            onClick={() => onSelectHour(index)}
            className={`flex flex-col justify-center items-center
                        backdrop-blur-md border rounded-xl p-3
                        text-white text-sm transition cursor-pointer
                        ${
                          selectedIndex === index
                            ? "bg-blue-600 border-blue-500 scale-105 shadow-lg"
                            : "bg-white/10 border-white/20 hover:bg-white/20"
                        }`}
          >
            <div className="font-semibold text-[1rem]">{formattedTime}</div>
            <div className="text-[1.4rem] font-bold">{temp}°C</div>
            <div className="opacity-80 capitalize">{item.condition}</div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeCard;