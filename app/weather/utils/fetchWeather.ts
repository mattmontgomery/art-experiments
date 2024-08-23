import { cache } from "react";
import { ForecastData, WeatherData, Location } from "./types";

export const fetchWeather = cache(async (location: Location) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`,
    {
      next: { revalidate: 3600 }, // Revalidate after 1 hour
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  const data = await response.json();

  const weather: WeatherData = {
    temperature: data.current_weather.temperature,
    weathercode: data.current_weather.weathercode,
  };

  const forecast: ForecastData[] = data.daily.time.map(
    (date: string, index: number) => ({
      date,
      temperature_max: data.daily.temperature_2m_max[index],
      temperature_min: data.daily.temperature_2m_min[index],
      weathercode: data.daily.weathercode[index],
      hourly_temperature: data.hourly.temperature_2m.filter(
        (_: unknown, hourIndex: number) =>
          data.hourly.time[hourIndex].startsWith(date)
      ),
      hourly_weathercode: data.hourly.weathercode.filter(
        (_: unknown, hourIndex: number) =>
          data.hourly.time[hourIndex].startsWith(date)
      ),
    })
  );

  return { weather, forecast };
});
