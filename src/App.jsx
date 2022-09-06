import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
      const crd = pos.coords;
      load();
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=58ef7241d8f28f936dc358b99959b7ad&units=metric`
        )
        .then((res) => setData(res.data));
    }
    const load = () => {
      const loader = document.getElementById("loader");
      setTimeout(() => {
        loader.classList.add("hide");
      }, 3000);
    };
  }, []);

  const clouds = "public/images/sky-clouds-background.jpg";
  const rain = "public/images/rain-drops-on-the-window.jpg";
  const snow = "public/images/beautiful-frost-pattern-on-window.jpg";
  const sunny = "public/images/v923-katie-04b.jpg";
  const image = data.weather?.[0].main;
  image == "Clouds"
    ? (document.body.style = `background-image: url(${clouds}`)
    : image == "Rain"
    ? (document.body.style = `background-image: url(${rain}`)
    : image == "Snow"
    ? (document.body.style = `background-image: url(${snow}`)
    : image == "Sunny"
    ? (document.body.style = `background-image: url(${sunny}`)
    : "green";

  const [degreesUnits, setDegreesUnits] = useState(true);
  const changeDegrees = () => {
    setDegreesUnits(!degreesUnits);
  };
  return (
    <div className="App box-opacity">
      <div id="loader" className="loader">
        <i class="fa-solid fa-cloud-arrow-down loader--img"></i>
      </div>
      <div className="container-App">
        <div className="title">
          <h1>El clima en</h1>
          <h3>
            {data.name}, {data.sys?.country}
          </h3>
        </div>
        <div className="icon">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`}
            alt=""
          />
        </div>
        <div className="data">
          <h3>"{data.weather?.[0].description}"</h3>
          <h3>
            <i class="fa-sharp fa-solid fa-wind"></i> Velocidad del viento:{" "}
            {data.wind?.speed}m/s
          </h3>
          <h3>
            <i class="fa-solid fa-cloud"></i> Nubosidad:
            {data.clouds?.all}%
          </h3>
          <h3>
            <i class="fa-solid fa-temperature-full"></i> Presion A:
            {data.main?.pressure}hPa
          </h3>
        </div>
        <div className="data-temp">
          <h3>
            {degreesUnits
              ? data.main?.temp + " °C"
              : ((data.main?.temp * 9) / 5 + 32).toFixed(2) + " °F"}
          </h3>
        </div>
        <button onClick={changeDegrees}>Grados °C/°F</button>
      </div>
    </div>
  );
}

export default App;
