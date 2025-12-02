import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  API_BASE_URL,
  TIME_UPDATE_INTERVAL,
  STALE_TIME,
} from "../utils/constants";

import Search from "./search";
import DateDisplay from "./date";
import TempStats from "./tempStats";
import DayCards from "./dayCards.jsx";
import TimeCard from "./timeCard.jsx";
import { loading } from "../assets/images";

function Display() {
  const [city, setCity] = useState("Delhi");
  const [errorMessage, setErrorMessage] = useState(null);
  const [time, setTime] = useState(new Date());
  const [selectedDayData, setSelectedDayData] = useState(null);
  const [selectedHourIndex, setSelectedHourIndex] = useState(0);

  const prevCityRef = useRef(city);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), TIME_UPDATE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["weather", city],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/weather/${city}`);
        const Data = await res.json();

        if (res.status === 404 || Data.error === `City "${city}" not found`) {
          setErrorMessage(`${city} City not found`);
          setTimeout(() => {
            setCity(prevCityRef.current);
            setErrorMessage(null);
          }, 3000);
          return null;
        }

        if (!res.ok || Data.error) {
          const err = new Error(
            Data.error || `Failed with status ${res.status}`
          );
          err.status = res.status;
          throw err;
        }

        prevCityRef.current = city;
        console.log(Data);

        return Data;
      } catch (err) {
        setErrorMessage("Something went wrong...");
        return null;
      }
    },
    enabled: !!city,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error?.status === 404 || error?.message?.includes("not found")) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const formatTime = useCallback(() => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let meridiam = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");

    return `${hours}:${minutes} ${meridiam}`;
  }, [time]);

  const getGreeting = useCallback(() => {
    const hours = time.getHours();
    if (hours >= 5 && hours < 12) return "Good Morning ☀️";
    if (hours >= 12 && hours < 17) return "Good Afternoon 🌤️";
    if (hours >= 17 && hours < 21) return "Good Evening 🌆";
    return "Good Night 🌙";
  }, [time]);

  const handleSelectDay = useCallback((day) => {
    setSelectedDayData(day);
    setSelectedHourIndex(0);
  }, []);

  // Default to first day if none selected
  const dayData = useMemo(
    () => selectedDayData || data?.daily?.[0],
    [selectedDayData, data]
  );
  const timeCardData = useMemo(() => dayData?.hourly || [], [dayData]);
  const selectedHour = useMemo(
    () => timeCardData[selectedHourIndex],
    [timeCardData, selectedHourIndex]
  );

  return (
    <div className="h-full w-full xl:h-7/10 xl:w-65/100 xl:rounded-4xl xl:flex xl:border-2">
      {errorMessage ? (
        <div className="flex flex-col items-center justify-center w-full h-full text-3xl text-red-500">
          <img src={loading} alt="loading" className="w-16 h-16 mb-3" />

          <div className="text-2xl">{errorMessage}</div>
        </div>
      ) : isPending ? (
        <div className="flex flex-col items-center justify-center w-full h-full text-blue-500">
          <img src={loading} alt="loading" className="w-16 h-16 mb-3" />
          <div className="text-2xl">Loading...</div>
        </div>
      ) : (
        <>
          {/* Left Section */}
          <div className="h-7/10 xl:h-10/10 xl:border-r-2 xl:rounded-4xl xl:w-6/10">
            <div className="h-1/10 flex justify-around items-center border-b">
              <Search onSearch={setCity} currentCity={city} />
              <DateDisplay />
            </div>

            <div className="h-9/10 flex flex-col gap-5 border-b-2 rounded-4xl">
              {dayData && (
                <TempStats
                  temp={dayData.avgTemp}
                  humidity={dayData.avgHumidity}
                  wind={dayData.avgWind}
                  feel={dayData.avgFeelsLike}
                  icon={dayData.icon}
                  condition={dayData.condition}
                />
              )}
              <div className="flex h-3/10 justify-center items-center">
                <DayCards
                  data={data?.daily}
                  onSelectDayData={handleSelectDay}
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/1 bg-black xl:h-10/10 xl:w-4/10 xl:rounded-r-4xl mt-5 lg:mt-0 flex flex-col">
            <div className="flex flex-col items-center gap-4 h-1/10 lg:h-15/100">
              <div className="text-4xl md:text-2xl lg:text-3xl text-center">
                {getGreeting()}
              </div>
              <div className="text-2xl">{formatTime()}</div>
            </div>

            <div className="flex h-2/10 md:h-4/10 w-auto text-[0.5em] items-center justify-center">
              {selectedHour && (
                <TempStats
                  temp={selectedHour.temp}
                  humidity={selectedHour.humidity}
                  wind={selectedHour.wind}
                  feel={selectedHour.feels_like}
                  icon={selectedHour.icon}
                  condition={selectedHour.description}
                />
              )}
            </div>

            <div className="h-7/10 border-t-2 rounded-t-4xl flex flex-col items-center gap-10 lg:gap-5 mt-5 lg:mt-0">
              <div className="text-center text-2xl pt-3">Hourly Forecast</div>
              <div className="w-full">
                <TimeCard
                  data={timeCardData}
                  selectedIndex={selectedHourIndex}
                  onSelectHour={setSelectedHourIndex}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Display;
