interface FilterHourlyDataParams {
  forecast: ForecastData | undefined;
  is24HourFormat: boolean;
}

export const filterHourlyData = ({
  forecast,
  is24HourFormat,
}: FilterHourlyDataParams):
  | Array<{
      displayTime: string;
      temperature: number | undefined;
      weathercode: number | undefined;
    }>
  | undefined => {
  if (
    !forecast ||
    !forecast.hourly_temperature ||
    !forecast.hourly_weathercode
  ) {
    return undefined;
  }

  const now = new Date();
  const hourlyData: Array<{
    displayTime: string;
    temperature: number;
    weathercode: number;
  }> = (forecast.hourly_temperature as number[]).map(
    (
      temp: number,
      index: number
    ): {
      displayTime: string;
      temperature: number;
      weathercode: number;
    } | null => {
      const time = new Date(forecast.date);
      time.setHours(index);

      if (time < now) return null;

      const displayTime = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: is24HourFormat ? "2-digit" : undefined,
        hour12: !is24HourFormat,
      });

      return {
        displayTime,
        temperature: temp,
        weathercode: forecast.hourly_weathercode[index],
      };
    }
  );

  return hourlyData
    .filter((data, idx) => {
      return idx % 2 === 0;
    })
    .filter((data) => data !== null) as Array<{
    displayTime: string;
    temperature: number | undefined;
    weathercode: number | undefined;
  }>;
};
