import { fetchWeather } from "./fetchWeather";
import { Location } from "./types";

interface FetchCurrentWeatherParams {
  location: Location | null;
  setLoading: (loading: boolean) => void;
  setForecast?: (forecast: ForecastData[] | undefined) => void;
  setSelectedForecast?: (forecast: ForecastData | undefined) => void;
  setError?: (error: string | null) => void;
}

export const fetchCurrentWeather = async ({
  location,
  setLoading,
  setForecast,
  setSelectedForecast,
  setError,
}: FetchCurrentWeatherParams) => {
  setLoading(true);

  try {
    if (!location) {
      throw new Error("Location is not set");
    }
    const response = await fetchWeather(location);
    console.log(response);
    if (!response.weather || !response.forecast) {
      throw new Error("Failed to fetch weather data");
    }

    if (setForecast) setForecast(response.forecast);
    if (setSelectedForecast) setSelectedForecast(response.forecast[0]);
  } catch (error) {
    if (setError) setError(String(error) ?? "An error occurred");
  } finally {
    setLoading(false);
  }
};
