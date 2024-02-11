/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import './Stylesheets/HistoricalWeather.css';

import {
    Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, defaults, Tooltip
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, [Tooltip]);
defaults.maintainAspectRatio = false;
defaults.responsive = true;
const HistorialWeather = ({ city, tempUnit, degree }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const getApiData = async () => {
            try {
                var result = [];
                for (var i = 0; i < 5; i++) {
                    var d = new Date();
                    d.setDate(d.getDate() - i);
                    d = formatDate(d);

                    const response = await fetch(`http://api.weatherapi.com/v1/history.json?key=${import.meta.env.VITE_API_KEY}&q=${city}&dt=${d}
                    `);
                    const data = await response.json();
                    const obj = {
                        date: data?.forecast?.forecastday[0]?.date,
                        maxTemp: data?.forecast?.forecastday[0]?.day?.['maxtemp_' + tempUnit],
                        minTemp: data?.forecast?.forecastday[0]?.day?.['mintemp_' + tempUnit],
                    }
                    result.push(obj);
                }
                setWeatherData(result);
            }
            catch (err) {
                console.log(err);
            }
        }
        getApiData();
    }, [city, tempUnit])

    function formatDate(date) {

        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        date = yyyy + '-' + mm + '-' + dd;
        return date
    }

    return (
        weatherData && weatherData.length > 0 &&
        <div className="chart-wrapper">
            <h1>
                Historical Weather
            </h1>
            <h4>
                Displaying weather data for past 5 days.
            </h4>
            <ChartContainer
                weatherData={weatherData}
                degree={degree}
            />
        </div>
    )
}

export default HistorialWeather

const ChartContainer = ({ weatherData, degree }) => {
    const data = {
        labels: weatherData?.map(ele => ele.date),
        datasets: [
            {
                labels: "Max Temp of the day ",
                data: weatherData?.map(ele => ele.maxTemp),
                backgroundColor: "red",
                borderColor: "red",
                borderWidth: '2',
                // fill:true,
                tension: 0.5
            }
            , {
                labels: "Min Temp of the day ",
                data: weatherData?.map(ele => ele.minTemp),
                backgroundColor: "lightblue",
                borderColor: "blue",
                borderWidth: '2',
                // fill:true,
                tension: 0.5
            }
        ]
    }
    const options = {
        plugins: {
            title: {
                display: true,
                text: "Min-Max Temperatures " + degree
            },
            legend: {
                display: true,
                position: "middle"
            },
            tooltip: {
                showTooltips: true,
                tooltipEvents: ["mousemove", "touchstart", "touchmove"],
                tooltipFillColor: "rgba(0,0,0,0.8)",
                displayColors: false,
                mode: 'index',
                intersect: false,
                callbacks: {
                    title(items) {
                        return items[0].raw;
                    },
                    label(item) {
                        return [
                            `${item.dataset.labels}: ${item.raw + degree} `,
                        ];
                    },
                },
            },
            interaction: {
                intersect: false,
                mode: 'index',
            }
        }
    }

    return (
        <div className="chart-container">
            <Line
                data={data}
                options={options}
            >
            </Line>
        </div>
    )
}