/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Search from "./Search"
import CurrentWeather from "./CurrentWeather";
// import ForecastWeather from "./ForecastWeather";
import HistorialWeather from "./HistoricalWeather";

import './Stylesheets/Weather.css';

const WeatherComponent = () => {
    const [cityParam, setCityParam] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [tempUnit, setTempUnit] = useState('c');
    const degree = tempUnit === 'c' ? "°C" : "°F";

    const HandleTempToggle = () => {
        setTempUnit(tempUnit === 'c' ? 'f' : 'c');
    }

    useEffect(() => {
        console.log(cityParam)
        const getApiData = async () => {
            if (cityParam?.length > 0) {
                try {
                    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${cityParam}&aqi=yes&alerts=yes`)
                    const data = await response.json();
                    console.log(data);
                    setWeatherData(data);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        getApiData();
    }, [cityParam])



    return (
        <div className="weather-component">
            <div className="logo-container">
                <img src="/src/assets/large_weatherist.png" alt="icon" />
            </div>
            <Search setCity={setCityParam} />
            {
                weatherData &&
                <div className="button-wrapper"
                >
                    <label className="switch">
                        <input type="checkbox" 
                          onClick={HandleTempToggle}
                          />
                        <span className="slider round"></span>
                    </label>
                </div>
            }
            {
                weatherData &&
                <div className="location-container">
                    <h2>{weatherData?.location?.name}</h2>
                    <h3>
                        {weatherData?.location?.region}
                        {weatherData?.location?.region ? ", " : ""}
                        {weatherData?.location?.country}
                    </h3>
                </div>
            }
            {weatherData && <CurrentWeather
                weatherData={weatherData}
                tempUnit={tempUnit}
                degree={degree}
            />}
            {/* {weatherData && <ForecastWeather
                weatherData={weatherData}
                tempUnit={tempUnit}
                degree={degree}
            />} */}
            {cityParam && <HistorialWeather
                city={cityParam}
                tempUnit={tempUnit}
                degree={degree}
            />}
        </div>
    )
}

export default WeatherComponent;


