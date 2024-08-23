import React from "react";
import { ForecastData } from "../utils/types";
import { convertTemperature } from "../utils/convertTemperature";
import { weatherCodeMap } from "../constants/weatherCodes";

interface ForecastBoxProps {
  forecast: ForecastData[];
  selectedForecast: ForecastData | null;
  isFahrenheit: boolean;
  onForecastClick: (forecast: ForecastData) => void;
}

const ForecastBox: React.FC<ForecastBoxProps> = ({
  forecast,
  selectedForecast,
  isFahrenheit,
  onForecastClick,
}) => {
  return (
    <div className="flex flex-wrap justify-center mt-4">
      {forecast.map((day) => {
        const isSelected = selectedForecast?.date === day.date;
        return (
          <div
            key={day.date}
            className={`cursor-pointer p-2 mx-2 my-2 border-2 border-white/50 rounded-lg text-center ${
              isSelected
                ? "bg-blue-600/30 text-white border-amber-100/80"
                : "bg-gray-800/30 text-gray-200"
            }`}
            onClick={() => onForecastClick(day)}
            style={{ width: "90px" }} // Slightly narrower box
          >
            <p className="text-sm font-semibold mb-1">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            {day && (
              <p className="text-xs mb-1">
                {convertTemperature(day.temperature_max, isFahrenheit)?.toFixed(
                  0
                )}
                ° /
                {convertTemperature(day.temperature_min, isFahrenheit)?.toFixed(
                  0
                )}
                °
              </p>
            )}
            <p className="text-xs">{weatherCodeMap[day.weathercode]?.emoji}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastBox;
