// services/weatherService.js
export async function fetchWeatherData() {
  const config = await fetch("/config.json").then((res) => res.json());
  const { latitude, longitude, city } = config;

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  const data = await response.json();

  return {
    city,
    temperature: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
    time: data.current_weather.time,
  };
}
