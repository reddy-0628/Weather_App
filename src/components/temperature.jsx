import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faWind,
  faEye,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSun,
  faCloud,
  faCloudShowersHeavy,
  faSnowflake,
  faBolt,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

const Temp = ({ weather }) => {
  if (
    !weather ||
    !weather.main ||
    !weather.wind ||
    !weather.visibility ||
    !weather.clouds ||
    !weather.weather
  ) {
    return null;
  }

  const { main, wind, visibility, weather: weatherDetails } = weather;
  const { humidity, pressure } = main;
  const weatherIcon = getWeatherIcon(weatherDetails[0].main);

  const temperatureCelsius = Math.round(main.temp - 273);

  return (
    <div className="weather-container">
      <div className="temp">
        <h1>{weather.name}</h1>
        <p>{weatherDetails[0].description}</p>
        <div className="temperature">
          <h1 className="tempe">{temperatureCelsius}°C</h1>
          {weatherIcon && (
            <FontAwesomeIcon className="icon" icon={weatherIcon} size="2x" />
          )}
        </div>
      </div>

      <div className="weather-info">
        <div className="weather-row">
          <FontAwesomeIcon icon={faTint} size="lg" />
          <p>Humidity: {humidity}%</p>
        </div>
        <div className="weather-row">
          <FontAwesomeIcon icon={faWind} size="lg" />
          <p>Wind: {wind.speed} km/h</p>
        </div>
        <div className="weather-row">
          <FontAwesomeIcon icon={faEye} size="lg" />
          <p>Visibility: {visibility} m</p>
        </div>
        <div className="weather-row">
          <FontAwesomeIcon icon={faTachometerAlt} size="lg" />
          <p>Pressure: {pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

const getWeatherIcon = (weatherCondition) => {
  switch (weatherCondition.toLowerCase()) {
    case "clear":
    case "clear sky":
      return faSun;
    case "clouds":
    case "overcast clouds":
    case "broken clouds":
      return faCloud;
    case "few clouds":
    case "scattered clouds":
      return faCloud;
    case "showers":
    case "rain":
    case "light rain":
      return faCloudShowersHeavy;
    case "snow":
      return faSnowflake;
    case "thunderstorm":
      return faBolt;
    case "mist":
    case "smog":
    case "haze":
    case "dust":
    case "fog":
    case "sand":
    case "ash":
    case "squalls":
      return faSmog;
    default:
      console.error(`Unknown weather condition: ${weatherCondition}`);
      return faCloud;
  }
};

export default Temp;
