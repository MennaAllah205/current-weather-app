import React, { useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidit_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    temperature: "16°C",
    location: "London",
    humidity: "91 %",
    windSpeed: "3.6",
  }); // State for weather data

  const search = async () => {
    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData({
          temperature: `${Math.round(data.main.temp - 273.15)}°C`, // Convert Kelvin to Celsius
          location: data.name,
          humidity: `${data.main.humidity} %`,
          windSpeed: data.wind.speed.toFixed(1),
        });
      } else {
        //  the case where the city is not found
        if (data.cod === "404") {
          alert("City not found. Please try again.");
        } else {
          console.error("Error fetching weather data:", data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={search_icon} alt="Search icon" onClick={search} />
      </div>
      <img src={clear_icon} alt="Clear weather" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidit_icon} alt="Humidity" className="data-icon" />
          <div className="data-text">
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="Wind Speed" className="data-icon" />
          <div className="data-text">
            <p>{weatherData.windSpeed}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
