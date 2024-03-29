/* eslint-disable react/prop-types */
import { useState } from "react"
import "./Stylesheets/CurrentWeather.css";
import HourForecast from "./HourForecast";
const CurrentWeather = ({ weatherData, tempUnit, degree }) => {

    return (
        weatherData &&
        <div className="weather-container">
            <div className="temp-wrapper">
                <div className="temp-container">
                    <div className="icon-container">
                        <img
                            src={weatherData.current?.condition?.icon}
                            alt={weatherData?.current?.condition?.code} />
                        <p>
                            {weatherData?.current?.condition?.text}
                        </p>
                    </div>
                    <span>
                        <h2>
                            {weatherData?.current?.["temp_" + tempUnit] + degree}
                        </h2>
                        <h4>Current Temperature</h4>
                    </span>
                    <span className="feel">
                        <h4>Feels Like</h4>
                        <h3>
                            {weatherData?.current?.["feelslike_" + tempUnit] + degree}
                        </h3>
                    </span>
                </div>
                <div className="info-wrapper">

                    <div className="info-box">
                        <h4>Wind Speed <IconWind /> </h4>
                        <span>
                            <h3>
                                {weatherData?.current?.wind_kph + "kmph"}
                            </h3>
                        </span>
                    </div>
                    <div className="info-box">
                        <h4>AQI <IconAir /></h4>
                        <span>
                            <h3>
                                {weatherData?.current?.air_quality?.pm2_5}
                            </h3>
                        </span>
                    </div>
                    <div className="info-box">
                        <h4>Humidity <IconDroplet /></h4>
                        <span>
                            <h3>
                                {weatherData?.current?.humidity + "%"}
                            </h3>
                        </span>
                    </div>
                    <div className="info-box">
                        <h4>Max-Temperature <IconTemperatureHigh /> </h4>
                        <h3>{weatherData?.forecast?.forecastday[0]?.day?.["maxtemp_" + tempUnit] + degree}</h3>
                    </div>
                    <div className="info-box">
                        <h4>Min-Temperature <IconTemperatureLow /></h4>
                        <h3>{weatherData?.forecast?.forecastday[0]?.day?.["mintemp_" + tempUnit] + degree}</h3>
                    </div>
                    <div className="info-box">
                        <h4>Chances of Rain <IconCloudRainHeavy /></h4>
                        <h3>{weatherData?.forecast?.forecastday[0]?.day?.daily_chance_of_rain + "%"}</h3>
                    </div>
                    <div className="info-box">
                        <h4>Chances of Snow <IconCloudSnow /> </h4>
                        <h3>{weatherData?.forecast?.forecastday[0]?.day?.daily_chance_of_snow + "%"}</h3>
                    </div>
                </div>
            </div>
            <HourForecast
                forecastData={weatherData?.forecast?.forecastday[0].hour}
                tempUnit={tempUnit}
                degree={degree}
            />
        </div>


    )
}

export default CurrentWeather;

function IconWind(props) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M12.5 2A2.5 2.5 0 0010 4.5a.5.5 0 01-1 0A3.5 3.5 0 1112.5 8H.5a.5.5 0 010-1h12a2.5 2.5 0 000-5zm-7 1a1 1 0 00-1 1 .5.5 0 01-1 0 2 2 0 112 2h-5a.5.5 0 010-1h5a1 1 0 000-2zM0 9.5A.5.5 0 01.5 9h10.042a3 3 0 11-3 3 .5.5 0 011 0 2 2 0 102-2H.5a.5.5 0 01-.5-.5z" />
        </svg>
    );
}

function IconDroplet(props) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 01-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 005.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0010 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
            />
            <path
                fillRule="evenodd"
                d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"
            />
        </svg>
    );
}

function IconAir(props) {
    return (
        <svg
            viewBox="0 0 905 1000"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M84.5 316c-10.667 9.333-22.667 13.333-36 12-13.333-1.333-24.667-7.333-34-18-9.333-9.333-13.333-21.333-12-36 1.333-14.667 7.333-26.667 18-36 32-26.667 58.333-46.667 79-60 20.667-13.333 50.333-26.667 89-40 38.667-13.333 81.667-14.667 129-4s100.333 32.667 159 66 110.333 51 155 53 78-3.333 100-16 51.667-35 89-67c25.333-20 48.667-18 70 6 21.333 26.667 19.333 50.667-6 72-81.333 73.333-159.333 110-234 110-66.667 0-140.667-23.333-222-70-45.333-25.333-85-42.667-119-52-34-9.333-65-9.333-93 0s-49.667 19-65 29c-15.333 10-37.667 27-67 51m736 110c25.333-21.333 48.667-19.333 70 6 21.333 26.667 19.333 50.667-6 72-26.667 22.667-48.333 40.333-65 53-16.667 12.667-40.667 25.333-72 38-31.333 12.667-63.667 19-97 19-64 0-138-23.333-222-70-45.333-25.333-85-42.667-119-52-34-9.333-65-9.333-93 0s-49.667 19-65 29c-15.333 10-37.667 27-67 51-9.333 9.333-21 13.333-35 12-14-1.333-25.667-7.333-35-18-21.333-26.667-19.333-50.667 6-72 25.333-22.667 45.333-39.333 60-50 14.667-10.667 37.667-23.333 69-38 31.333-14.667 60.667-22.333 88-23 27.333-.667 62.333 4.333 105 15s87.333 29.333 134 56c45.333 25.333 85 42.667 119 52 34 9.333 65 9.333 93 0s49.667-19 65-29c15.333-10 37.667-27 67-51m0 256c25.333-21.333 48.667-19.333 70 6 9.333 9.333 13.333 21.333 12 36-1.333 14.667-7.333 26.667-18 36-26.667 22.667-48.333 40.333-65 53-16.667 12.667-40.667 25.333-72 38-31.333 12.667-63.667 19-97 19-64 0-138-23.333-222-70-45.333-25.333-85-42.667-119-52-34-9.333-65-9.667-93-1s-50 18.333-66 29c-16 10.667-38 28-66 52-9.333 9.333-21 13.333-35 12-14-1.333-25.667-7.333-35-18-21.333-26.667-19.333-50.667 6-72 25.333-22.667 45.333-39.333 60-50 14.667-10.667 37.667-23.333 69-38 31.333-14.667 60.667-22.333 88-23 27.333-.667 62.333 4.333 105 15s87.333 29.333 134 56c45.333 25.333 85 42.667 119 52 34 9.333 65 9.333 93 0s49.667-19 65-29c15.333-10 37.667-27 67-51" />
        </svg>
    );
}
function IconCloudRainHeavy(props) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M4.176 11.032a.5.5 0 01.292.643l-1.5 4a.5.5 0 11-.936-.35l1.5-4a.5.5 0 01.644-.293zm3 0a.5.5 0 01.292.643l-1.5 4a.5.5 0 11-.936-.35l1.5-4a.5.5 0 01.644-.293zm3 0a.5.5 0 01.292.643l-1.5 4a.5.5 0 11-.936-.35l1.5-4a.5.5 0 01.644-.293zm3 0a.5.5 0 01.292.643l-1.5 4a.5.5 0 01-.936-.35l1.5-4a.5.5 0 01.644-.293zm.229-7.005a5.001 5.001 0 00-9.499-1.004A3.5 3.5 0 103.5 10H13a3 3 0 00.405-5.973zM8.5 1a4 4 0 013.976 3.555.5.5 0 00.5.445H13a2 2 0 010 4H3.5a2.5 2.5 0 11.605-4.926.5.5 0 00.596-.329A4.002 4.002 0 018.5 1z" />
        </svg>
    );
}
function IconCloudSnow(props) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M13.405 4.277a5.001 5.001 0 00-9.499-1.004A3.5 3.5 0 103.5 10.25H13a3 3 0 00.405-5.973zM8.5 1.25a4 4 0 013.976 3.555.5.5 0 00.5.445H13a2 2 0 01-.001 4H3.5a2.5 2.5 0 11.605-4.926.5.5 0 00.596-.329A4.002 4.002 0 018.5 1.25zM2.625 11.5a.25.25 0 01.25.25v.57l.501-.287a.25.25 0 01.248.434l-.495.283.495.283a.25.25 0 01-.248.434l-.501-.286v.569a.25.25 0 11-.5 0v-.57l-.501.287a.25.25 0 01-.248-.434l.495-.283-.495-.283a.25.25 0 01.248-.434l.501.286v-.569a.25.25 0 01.25-.25zm2.75 2a.25.25 0 01.25.25v.57l.501-.287a.25.25 0 01.248.434l-.495.283.495.283a.25.25 0 01-.248.434l-.501-.286v.569a.25.25 0 11-.5 0v-.57l-.501.287a.25.25 0 01-.248-.434l.495-.283-.495-.283a.25.25 0 01.248-.434l.501.286v-.569a.25.25 0 01.25-.25zm5.5 0a.25.25 0 01.25.25v.57l.501-.287a.25.25 0 01.248.434l-.495.283.495.283a.25.25 0 01-.248.434l-.501-.286v.569a.25.25 0 11-.5 0v-.57l-.501.287a.25.25 0 01-.248-.434l.495-.283-.495-.283a.25.25 0 01.248-.434l.501.286v-.569a.25.25 0 01.25-.25zm-2.75-2a.25.25 0 01.25.25v.57l.501-.287a.25.25 0 01.248.434l-.495.283.495.283a.25.25 0 01-.248.434l-.501-.286v.569a.25.25 0 11-.5 0v-.57l-.501.287a.25.25 0 01-.248-.434l.495-.283-.495-.283a.25.25 0 01.248-.434l.501.286v-.569a.25.25 0 01.25-.25zm5.5 0a.25.25 0 01.25.25v.57l.501-.287a.25.25 0 01.248.434l-.495.283.495.283a.25.25 0 01-.248.434l-.501-.286v.569a.25.25 0 11-.5 0v-.57l-.501.287a.25.25 0 01-.248-.434l.495-.283-.495-.283a.25.25 0 01.248-.434l.501.286v-.569a.25.25 0 01.25-.25z" />
        </svg>
    );
}
function IconTemperatureHigh(props) {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M416 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm0 64c53 0 96-43 96-96S469 0 416 0s-96 43-96 96 43 96 96 96zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48v164.5c0 17.3 7.1 31.9 15.3 42.5 10.5 13.6 16.7 30.5 16.7 49 0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9 8.2-10.7 15.3-25.3 15.3-42.6V112zM144 0C82.1 0 32 50.2 32 112v164.5c0 .1-.1.3-.2.6-.2.6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.3-63.8-30.1-88.1-.9-1.2-1.5-2.2-1.7-2.8-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48 0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16v210.7c-18.6 6.6-32 24.4-32 45.3 0 26.5 21.5 48 48 48z" />
        </svg>
    );
}
function IconTemperatureLow(props) {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M448 96c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32zm64 0c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM144 64c-26.5 0-48 21.5-48 48v164.5c0 17.3-7.1 31.9-15.3 42.5C70.2 332.6 64 349.5 64 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM32 112C32 50.2 82.1 0 144 0s112 50.1 112 112v164.5c0 .1.1.3.2.6.2.6.8 1.6 1.7 2.8 18.9 24.4 30.1 55 30.1 88.1 0 79.5-64.5 144-144 144S0 447.5 0 368c0-33.2 11.2-63.8 30.1-88.1.9-1.2 1.5-2.2 1.7-2.8.1-.3.2-.5.2-.6V112zm160 256c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V272c0-8.8 7.2-16 16-16s16 7.2 16 16v50.7c18.6 6.6 32 24.4 32 45.3z" />
        </svg>
    );
}