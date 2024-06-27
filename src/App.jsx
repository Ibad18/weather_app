import React from "react";
import "./App.css"
import { useState } from "react";
import axios from "axios";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "64e2eaed5df89fbbadcbf19b688b32c5";
  const getWeather = async (city) => {
    try {
      if (city != "") {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        setWeather(response.data)
        console.log(response.data)
        console.log(response.data.name)
        setError(null)
      }
      else {
        alert("Please enter the city name")
        setError(null)
      }
    }
    catch (error) {
      setError("City not found")
      setWeather(null)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(city)
    setCity("")
  }
  return (
    <>
      <div className="app_body">
        <h2>Current Weather App</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
          <button type="submit">Search</button>
        </form>
        <hr />
        {error && <p className="error">{error}</p>}
        {weather && <div className="result">
          <p className="name">{weather.name + " "}<FaMapMarkerAlt /></p>
          <p className="temp">{Math.round(weather.main.temp - 273.15) + '°C'}</p>
          <div className="icon">
            <p>{weather.weather[0].description}<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" /></p>
          </div>
        </div>}
      </div>
    </>
  )
}
export default App