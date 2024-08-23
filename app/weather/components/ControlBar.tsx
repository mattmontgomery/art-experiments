import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import { weatherCodeMap } from "../constants/weatherCodes";

interface ControlBarProps {
  isFahrenheit: boolean;
  onToggleTemperature: () => void;
  is24HourFormat: boolean;
  onToggleTimeFormat: () => void;
  onWeatherCodeChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isDevelopment: boolean;
}

const ControlBar: React.FC<ControlBarProps> = ({
  isFahrenheit,
  onToggleTemperature,
  is24HourFormat,
  onToggleTimeFormat,
  onWeatherCodeChange,
  isDevelopment,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 z-50 py-2 shadow-lg">
      <div className="flex justify-between items-center max-w-4xl mx-auto px-4">
        <div className="flex space-x-6">
          <ToggleSwitch
            isChecked={isFahrenheit}
            onToggle={onToggleTemperature}
            labelOn="F"
            labelOff="C"
          />
          <ToggleSwitch
            isChecked={is24HourFormat}
            onToggle={onToggleTimeFormat}
            labelOn="24H"
            labelOff="12H"
          />
        </div>
        {isDevelopment && onWeatherCodeChange && (
          <div className="flex space-x-2">
            <label htmlFor="weatherCode" className="text-white">
              Test Weather Condition:
            </label>
            <select
              id="weatherCode"
              onChange={onWeatherCodeChange}
              className="bg-gray-700 text-white p-2 rounded"
            >
              <option value="">Select a weather condition</option>
              {Object.entries(weatherCodeMap).map(([code, { description }]) => (
                <option key={code} value={code}>
                  {description}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlBar;
