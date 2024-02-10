/* eslint-disable react/prop-types */
import './Stylesheets/HourlyForecast.css';
const HourForecast = ({ forecastData, tempUnit, degree }) => {
    console.log("for data", forecastData)
    return (
        forecastData && forecastData.length > 0 &&
        <div className="forecast-container">
            <h1>Hourly Forecast</h1>
            <div className="list-wrapper">

                {
                    forecastData?.map(
                        (ele, index) =>
                            <div key={index + 'f'}
                                className="list-item">
                                <h4>{ele?.time?.split(" ")[1]}</h4>
                                <img src={ele?.condition?.icon} alt="" />
                                <h3>{ele?.["temp_" + tempUnit] + degree}</h3>
                                <h4>{ele?.condition?.text}</h4>
                            </div>
                    )
                }
            </div>
        </div>
    )
}

export default HourForecast