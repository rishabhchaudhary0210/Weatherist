/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import './Stylesheets/HistoricalWeather.css';

import {
    Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const HistorialWeather = ({ city, tempUnit, degree }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(()=>{
        const getApiData = async ()=>{
            try{
                var result = [];
                for (var i=0; i<5; i++) {
                    var d = new Date();
                    d.setDate(d.getDate() - i);
                    d = formatDate(d);

                    const response = await fetch(`http://api.weatherapi.com/v1/history.json?key=${import.meta.env.VITE_API_KEY}&q=${city}&dt=${d}
                    `);
                    const data = await response.json();
                    const obj = {
                        date : data?.forecast?.forecastday[0]?.date,
                        maxTemp: data?.forecast?.forecastday[0]?.day?.['maxtemp_'+tempUnit],
                        minTemp : data?.forecast?.forecastday[0]?.day?.['mintemp_'+tempUnit],
                    }
                    result.push(obj);
                }
                setWeatherData(result);
            }
            catch(err){
                console.log(err);
            }
        }
        getApiData();
    },[city, tempUnit])

    function formatDate(date){

        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = yyyy+'-'+mm+'-'+dd;
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

const ChartContainer = ({weatherData, degree})=>{
    const data = {
        labels: weatherData?.map(ele => ele.date),
        datasets: [
            {
                labels: "Max Temp of the day "+degree,
                data: weatherData?.map(ele => ele.maxTemp),
                backgroundColor:"rgb(255, 99, 132)",
                borderColor:"rgb(255, 99, 132)",
                borderWidth:'2',
                // fill:true,
                tension:0.5
            }
            ,{
                labels: "Min Temp of the day "+degree,
                data: weatherData?.map(ele => ele.minTemp),
                backgroundColor:"yellow",
                borderColor:"green",
                borderWidth:'2',
                // fill:true,
                tension:0.5
            }
        ]
    }
    const options={
        plugins: {
          title: {
            display: true,
            text: "Min-Max Temperatures "+degree
          },
          legend: {
            display: true,
            position:"left"
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