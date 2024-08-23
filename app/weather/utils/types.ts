export interface Location {
  lat: number;
  lon: number;
}

export interface WeatherData {
  temperature: number;
  weathercode: number;
}

export interface ForecastData {
  date: string;
  temperature_max: number;
  temperature_min: number;
  weathercode: number;
  hourly_temperature: number[]; // Array of temperatures for each hour
  hourly_weathercode: number[]; // Array of weather codes for each hour
}
