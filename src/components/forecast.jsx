import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudShowersHeavy,
  faSnowflake,
  faBolt,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const Forecast = ({ forecastData }) => {
  const renderHourlyForecast = () => {
    return forecastData.map((forecast, index) => {
      if (index < 5) {
        const temperatureCelsius = Math.round(forecast.temperature - 273);

        return (
          <div key={index} className="column">
            <p>
              <FontAwesomeIcon icon={faClock} /> {formatTime(forecast.time)}
            </p>
            <p>
              <FontAwesomeIcon icon={getWeatherIcon(forecast.conditions)} />{" "}
              {formatTemperature(temperatureCelsius)}°C
            </p>
          </div>
        );
      } else {
        return null; // Render nothing for forecasts beyond the first five
      }
    });
  };
  const formatTime = (timeString) => {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    const formattedTime = new Date(timeString).toLocaleTimeString(
      "en-US",
      options
    );
    return formattedTime;
  };

  const formatTemperature = (temperature) => {
    return Math.round(temperature);
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case "clear":
      case "clear sky":
        return faSun;
      case "clouds":
      case "overcast clouds":
      case "broken clouds":
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
        // You can return a default icon here if needed, such as faQuestionCircle
        return faCloud;
    }
  };

  return (
    <div className="container">
      <div className="head">
        <h4 className="h1">Hourly Forecast</h4>
        <hr className="line" />
        <div className="row">
          {forecastData.length > 0 ? (
            renderHourlyForecast()
          ) : (
            <p>No hourly forecast available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
