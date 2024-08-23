export const getBackgroundClass = (weatherCode: number | undefined) => {
  switch (weatherCode) {
    case 0: // Clear sky
    case 1: // Mainly clear
      return "bg-gradient-to-b from-blue-500 to-blue-700";
    case 2: // Partly cloudy
    case 3: // Overcast
      return "bg-gradient-to-b from-gray-500 to-gray-700";
    case 45: // Fog
    case 48: // Depositing rime fog
      return "bg-gradient-to-b from-gray-400 to-gray-600";
    case 51: // Drizzle: Light intensity
    case 53: // Drizzle: Moderate intensity
    case 55: // Drizzle: Dense intensity
      return "bg-gradient-to-b from-blue-400 to-gray-500";
    case 61: // Rain: Slight intensity
    case 63: // Rain: Moderate intensity
    case 65: // Rain: Heavy intensity
    case 80: // Rain showers: Slight
    case 81: // Rain showers: Moderate
    case 82: // Rain showers: Violent
      return "bg-gradient-to-b from-blue-600 to-gray-800";
    case 71: // Snow fall: Slight intensity
    case 73: // Snow fall: Moderate intensity
    case 75: // Snow fall: Heavy intensity
      return "bg-gradient-to-b from-gray-300 to-gray-500";
    case 95: // Thunderstorm: Slight or moderate
    case 96: // Thunderstorm with slight hail
    case 99: // Thunderstorm with heavy hail
      return "bg-gradient-to-b from-purple-700 to-gray-900";
    default:
      return "bg-gradient-to-b from-gray-500 to-gray-700"; // Fallback for unknown weather codes
  }
};
