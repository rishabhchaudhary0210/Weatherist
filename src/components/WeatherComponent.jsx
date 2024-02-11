/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Search from "./Search"
import CurrentWeather from "./CurrentWeather";
import HistorialWeather from "./HistoricalWeather";
import logo from './../assets/large_weatherist.png'

import './Stylesheets/Weather.css';

const WeatherComponent = () => {
    const [cityParam, setCityParam] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [tempUnit, setTempUnit] = useState('c');
    const [error, setError] = useState(null);
    const degree = tempUnit === 'c' ? "°C" : "°F";

    const HandleTempToggle = () => {
        setTempUnit(tempUnit === 'c' ? 'f' : 'c');
    }

    useEffect(() => {
        const getApiData = async () => {
            if (cityParam?.length > 0) {
                try {
                    setError(null);
                    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${cityParam}&aqi=yes&alerts=yes`);
                    if (!response.ok) {
                        setError("Error getting data");
                        return;
                    }
                    const data = await response.json();
                    setWeatherData(data);
                }
                catch (err) {
                    // console.log(err);
                    setError("Error getting data");
                }
            }
        }
        getApiData();
    }, [cityParam])



    return (
        
            <div className="weather-component">
                <div className="logo-container">
                    <img src={logo} alt="icon" />
                </div>
                <Search setCity={setCityParam} />
                { error ? <div className="error-container">
                    {error}
                </div> :
                    <>
                    {
                        weatherData &&
                        <div className="button-wrapper">
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
                    {cityParam && <HistorialWeather
                        city={cityParam}
                        tempUnit={tempUnit}
                        degree={degree}
                    />}
                </>}
            </div>
    )
}

export default WeatherComponent;


