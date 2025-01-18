import React, { useState, useEffect } from "react";
import axios from "axios";
import Temp from "./temperature";
import Forecast from "./forecast";
import DailyForecast from "./daily";

const Input = () => {
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [findLocation, setFindLocation] = useState("");
  const [saveLocation, setSaveLocation] = useState(false);

  useEffect(() => {
    findByLocation();
  }, [findLocation]);

  const extractForecastData = (weatherData) => {
    if (weatherData.list) {
      return weatherData.list.map((item) => ({
        time: item.dt_txt,
        temperature: item.main.temp,
        conditions: item.weather[0].description,
        precipitation: item.pop,
      }));
    }
    return [];
  };

  const extractDailyData = (weatherData) => {
    if (weatherData.daily) {
      return dailyData.daily.map((item) => ({
        day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        conditions: item.weather[0].description,
        precipitation: item.pop,
      }));
    }
    return [];
  };

  const searchLocation = async (e) => {
    e.preventDefault();
    setLocation("");

    try {
      if (location) {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d1ef06b44c33e103bca2e875c1e96f30`
        );
        setWeatherData(weatherResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=d1ef06b44c33e103bca2e875c1e96f30`
        );
        setForecastData(extractForecastData(forecastResponse.data));

        const dailyResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&exclude=daily&appid=d1ef06b44c33e103bca2e875c1e96f30`
        );
        setDailyData(extractDailyData(dailyResponse.data));

        if (saveLocation) {
          setLocations((prevLocations) => [...prevLocations, location]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const findByLocation = () => {
    try {
      if (location) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d1ef06b44c33e103bca2e875c1e96f30`
        )
          .then((response) => response.json())
          .then((data) => {
            setWeatherData(data);
          });

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=d1ef06b44c33e103bca2e875c1e96f30`
        )
          .then((response) => response.json())
          .then((data) => {
            setForecastData(extractForecastData(data));
          });

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&exclude=daily&appid=d1ef06b44c33e103bca2e875c1e96f30`
        )
          .then((response) => response.json())
          .then((data) => {
            setDailyData(extractDailyData(data));
          });

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${navigator.geolocation.getCurrentPosition}&lon=${navigator.geolocation.getCurrentPosition}&appid=d1ef06b44c33e103bca2e875c1e96f30&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            setDailyData(extractDailyData(data));
          });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=" +
              position.coords.latitude +
              "&lon=" +
              position.coords.longitude +
              "&appid=d1ef06b44c33e103bca2e875c1e96f30&units=metric"
          )
            .then((response) => response.json())
            .then((data) => {
              setLocation(data.name);
              setFindLocation(data.value);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const switchLocation = async (selectedLocation) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&appid=d1ef06b44c33e103bca2e875c1e96f30`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${selectedLocation}&appid=d1ef06b44c33e103bca2e875c1e96f30`
      );
      setForecastData(extractForecastData(forecastResponse.data));

      const dailyResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${selectedLocation}&exclude=daily&appid=d1ef06b44c33e103bca2e875c1e96f30`
      );
      setDailyData(extractDailyData(dailyResponse.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteLocation = (deletedLocation) => {
    setLocations((prevLocations) =>
      prevLocations.filter((loc) => loc !== deletedLocation)
    );
  };

  return (
    <div className="app">
      <div className="search">
        <div className="input-group">
          <input
            className="text"
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={searchLocation}>Search</button>
          <button className="loc" onClick={getLocation}>Find Location</button>
        </div>

        {/* <label className="save">
          Save Location
          <input
            type="checkbox"
            checked={saveLocation}
            onChange={() => setSaveLocation(!saveLocation)}
          />
        </label> */}

        {locations.length > 0 && (
          <div className="user">
            <p>Saved Locations:</p>
            {locations.map((savedLocation) => (
              <div key={savedLocation} className="saved-location">
                <button
                  className="buttons"
                  onClick={() => switchLocation(savedLocation)}
                >
                  {savedLocation}
                </button>
                <button
                  className="buttons delete"
                  onClick={() => deleteLocation(savedLocation)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {weatherData && (
          <>
            <Temp weather={weatherData} />
            <Forecast forecastData={forecastData} />
            <DailyForecast forecastData={forecastData} />
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
