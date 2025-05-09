export const getWeatherIcon = (code) => {
  const iconMap = {
    0: "sunny", // Clear sky
    1: "mostly_clear",
    2: "partly_cloudy",
    3: "overcast",
    45: "fog",
    48: "fog",
    51: "drizzle",
    53: "drizzle",
    55: "drizzle",
    61: "rain",
    63: "rain",
    65: "rain",
    71: "snow",
    73: "snow",
    75: "snow",
    80: "showers",
    81: "showers",
    82: "showers",
    95: "thunderstorm",
    96: "thunderstorm",
    99: "thunderstorm",
  };

  return iconMap[code] || "unknown";
};
