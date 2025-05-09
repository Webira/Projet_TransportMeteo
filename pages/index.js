import { useEffect, useState } from "react";
import { MainCard } from "../components/MainCard";
import { Header } from "../components/Header";
import { ContentBox } from "../components/ContentBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState(null);

  // Charge config.json pour obtenir les coordonnées
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/config.json");
        const config = await res.json();
        setLocation(config);
      } catch (err) {
        setErrorMessage("Impossible de charger la configuration.");
      }
    };
    fetchConfig();
  }, []);

  // Fonction de récupération météo
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`
      );
      const data = await response.json();
      setWeatherData({
        temperature: data.current.temperature_2m,
        windspeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        time: data.current.time,
        city: location.city,
      });
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Erreur lors du chargement des données météo.");
    } finally {
      setLoading(false);
    }
  };

  // Rafraîchissement toutes les heures
  useEffect(() => {
    if (!location) return;
    fetchWeather(location.latitude, location.longitude);

    const intervalId = setInterval(() => {
      fetchWeather(location.latitude, location.longitude);
    }, 3600000); // 1h en ms

    return () => clearInterval(intervalId);
  }, [location]);

  if (loading) return <LoadingScreen loadingMessage="Chargement météo..." />;
  if (errorMessage) return <ErrorScreen errorMessage={errorMessage} />;

  return (
    <ContentBox>
      <Header>
        <h1>Météo Transport</h1>
      </Header>
      <MainCard
        city={weatherData.city}
        temperature={weatherData.temperature}
        windspeed={weatherData.windspeed}
        time={weatherData.time}
        weatherCode={weatherData.weatherCode}
      />
    </ContentBox>
  );
};

export default Home;
