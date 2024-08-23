export const convertTemperature = (
  tempCelsius: number | undefined,
  isFahrenheit: boolean
): number | undefined => {
  if (tempCelsius === undefined) return undefined;
  return isFahrenheit ? (tempCelsius * 9) / 5 + 32 : tempCelsius;
};
