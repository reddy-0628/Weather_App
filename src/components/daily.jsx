import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faSun,
  faCloud,
  faCloudShowersHeavy,
  faSnowflake,
  faBolt,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

const DailyForecast = ({ forecastData }) => {
  const renderDailyForecast = () => {
    const weeklyData = forecastData.reduce((acc, forecast) => {
      const weekday = getWeekday(forecast.time);
      if (!acc[weekday] && Object.keys(acc).length < 11) {
        acc[weekday] = forecast;
      }
      return acc;
    }, {});

    const weeklyEntries = Object.values(weeklyData);

    return weeklyEntries.map((forecast, index) => {
      const temperatureCelsius = Math.round(forecast.temperature - 273);

      return (
        <div key={index} className="column">
          <p>
            <FontAwesomeIcon icon={faCalendarAlt} /> {getWeekday(forecast.time)}
          </p>
          <p>{getDay(forecast.time)}</p>
          <p>
            <FontAwesomeIcon icon={getWeatherIcon(forecast.conditions)} />
          </p>
          <p>{formatTemperature(temperatureCelsius)}°C</p>
        </div>
      );
    });
  };

  const getDay = (timeString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const day = new Date(timeString).toLocaleDateString("en-US", options);

    const [month, dayOfMonth, year] = day.split("/");
    return `${dayOfMonth}/${month}/${year}`;
  };

  const getWeekday = (timeString) => {
    const options = { weekday: "long" };
    const weekday = new Date(timeString).toLocaleDateString("en-US", options);
    return weekday;
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

        return faCloud;
    }
  };

  return (
    <div className="container">
      <div className="head">
        <h4 className="h1">Daily Forecast</h4>
        <hr className="line" />
        <div className="row">
          {forecastData.length > 0 ? (
            renderDailyForecast()
          ) : (
            <p>No forecast data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyForecast;
