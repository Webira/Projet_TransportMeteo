import Image from "next/image";
import styles from "./MainCard.module.css";
import { getWeatherIcon } from "../services/weatherIcons";

export const MainCard = ({
  city,
  temperature,
  windspeed,
  time,
  weatherCode,
}) => {
  const iconName = getWeatherIcon(weatherCode);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>{city}</h1>
      <p className={styles.description}>Conditions météo à {time}</p>

      <Image
        width="300px"
        height="300px"
        src={`/icons/${iconName}.svg`}
        alt="weatherIcon"
      />

      <h1 className={styles.temperature}>{Math.round(temperature)}°C</h1>
      <p>Vent : {windspeed} m/s</p>
    </div>
  );
};
