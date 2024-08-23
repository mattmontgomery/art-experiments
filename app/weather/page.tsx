"use client";

import { useEffect, useState } from "react";
import { reverseGeocode } from "./utils/reverseGeocode";
import { fetchCurrentWeather } from "./utils/fetchCurrentWeather";
import { filterHourlyData } from "./utils/filterHourlyData";
import { convertTemperature } from "./utils/convertTemperature";
import { WeatherData, ForecastData, Location } from "./utils/types";
import ForecastBox from "./components/ForecastBox";
import { getBackgroundClass } from "./constants/getBackgroundClass";
import { weatherCodeMap } from "./constants/weatherCodes";
import RaindropAnimation from "./components/RaindropAnimation";
import LightningAnimation from "./components/LightningAnimation";
import ControlBar from "./components/ControlBar";

const WeatherPage = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | undefined>(
    undefined
  );
  const [cityName, setCityName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(false);
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);
  const [selectedForecast, setSelectedForecast] = useState<
    ForecastData | undefined
  >(undefined);
  const [overrideWeatherCode, setOverrideWeatherCode] = useState<number | null>(
    null
  );
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const isDevelopment = process.env.NODE_ENV === "development";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });

          const city = await reverseGeocode({ latitude, longitude });
          setCityName(city);
        },
        (err) => {
          setError("Failed to retrieve your location. Please try again.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchCurrentWeather({
        location,
        setLoading,
        setForecast,
        setSelectedForecast,
        setError,
      });

      // Set up interval to refresh weather every 10 minutes
      const id = setInterval(
        () =>
          fetchCurrentWeather({
            location,
            setLoading,
            setForecast,
            setSelectedForecast,
            setError,
          }),
        10 * 60 * 1000
      ); // 10 minutes
      setIntervalId(id);

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [location]);

  const handleToggleTemperature = () => {
    setIsFahrenheit((prev) => !prev);
  };

  const handleToggleTimeFormat = () => {
    setIs24HourFormat((prev) => !prev);
  };

  const handleForecastClick = (forecast: ForecastData) => {
    setSelectedForecast(forecast);
  };

  const handleWeatherCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOverrideWeatherCode(parseInt(event.target.value, 10));
  };

  const currentWeatherCode =
    overrideWeatherCode !== null
      ? overrideWeatherCode
      : selectedForecast?.weathercode ?? -1;

  const backgroundClass =
    currentWeatherCode !== null
      ? getBackgroundClass(currentWeatherCode)
      : "bg-gradient-to-b from-gray-500 to-gray-700";

  const isRaining =
    currentWeatherCode !== null &&
    weatherCodeMap[currentWeatherCode]?.isRaining;
  const isThunderstorm =
    currentWeatherCode !== null && [95, 96, 99].includes(currentWeatherCode);
  const currentWeatherEmoji =
    currentWeatherCode !== null
      ? weatherCodeMap[currentWeatherCode]?.emoji
      : "❓";

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen py-2 ${backgroundClass}`}
    >
      <ControlBar
        isFahrenheit={isFahrenheit}
        onToggleTemperature={handleToggleTemperature}
        is24HourFormat={is24HourFormat}
        onToggleTimeFormat={handleToggleTimeFormat}
        onWeatherCodeChange={handleWeatherCodeChange}
        isDevelopment={isDevelopment}
      />
      <div className="container m-auto flex items-center flex-col">
        {loading && <p className="text-xl text-white">Loading...</p>}
        {error && <p className="text-xl text-red-500">{error}</p>}
        {selectedForecast && cityName && (
          <>
            <div className="mt-20 text-center text-white">
              <h1 className="max-w-2xl m-auto text-4xl font-bold">
                Weather for {cityName}
              </h1>
              <div className="flex items-center justify-center mt-4">
                <span className="text-6xl mr-4">{currentWeatherEmoji}</span>{" "}
                {/* Large Emoji */}
                <p className="text-2xl">
                  {convertTemperature(
                    selectedForecast.temperature_max,
                    isFahrenheit
                  )?.toFixed(1)}
                  °{isFahrenheit ? "F" : "C"}
                </p>
              </div>
              <p className="text-xl mt-2">
                {weatherCodeMap[currentWeatherCode]?.description || "Unknown"}
              </p>
            </div>

            <div className="mt-10">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  fetchCurrentWeather({
                    location,
                    setLoading,
                    setForecast,
                    setSelectedForecast,
                    setError,
                  })
                }
              >
                Refresh Current Weather
              </button>
            </div>

            {isRaining && <RaindropAnimation />}
            {isThunderstorm && <LightningAnimation />}

            {forecast && (
              <>
                <ForecastBox
                  forecast={forecast}
                  selectedForecast={selectedForecast}
                  isFahrenheit={isFahrenheit}
                  onForecastClick={handleForecastClick}
                />
                <div className="mt-10 w-full max-w-4xl text-white ">
                  <h2 className="text-2xl font-bold mb-4">Hourly Breakdown</h2>
                  <div className="flex flex-wrap">
                    {filterHourlyData({
                      forecast: selectedForecast,
                      is24HourFormat,
                    })?.map(
                      ({ displayTime, temperature, weathercode }, index) => (
                        <div key={index} className="text-center min-w-16">
                          <p className="text-sm">{displayTime}</p>
                          <p className="text-md">
                            {convertTemperature(
                              temperature,
                              isFahrenheit
                            )?.toFixed(1)}
                            °{isFahrenheit ? "F" : "C"}
                          </p>
                          <p>{weatherCodeMap[weathercode ?? -1]?.emoji}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
