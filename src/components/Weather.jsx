import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import { useState,  useEffect , useRef } from 'react';

const Weather = () => {
    
    const inputref = useRef();
    const [weathers, setWeather] = useState(false);

    const  icon_conditions ={
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "11d" : wind_icon,
        "11n" : wind_icon,
        "13d" : snow_icon,
        "13n" : snow_icon,
    }

    const search = async (city) => {

        if(city === ""){
            alert("Please enter a city name");
            return;
        }

        try{
            const res = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`;

            const response = await fetch(res);
            const data = await response.json();
            console.log(data);
            const icon = icon_conditions[data.weather[0].icon] || clear_icon;
            setWeather({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temprature : Math.floor(data.main.temp),
                location: data.name,
                icon : icon
            })
        }
        catch(error){
            setWeather(false);
            console.error("Error fetching weather data:");
        }
    }

    useEffect(() => {search("New Delhi")},[])  // useEffect to call the search function when the component mounts

    return(
        
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputref} type="text" placeholder='Search' />
                <img src={search_icon} alt="" onClick={()=>search(inputref.current.value)}/>
            </div>

            {weathers ? <>
            <img src={weathers.icon} alt=""  className='weather-icon'/>
            <p className='temp'>{weathers.temprature}℃</p>
            <p className='city'>{weathers.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weathers.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weathers.windSpeed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            </>  : <> </> }
        </div>
       
    )
}
export default Weather;