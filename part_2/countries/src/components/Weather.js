import React, { useState, useEffect } from "react";

import axios from "axios";
import './Weather.css'

const Weather = ({ country }) => {
    const [ newCountry, setNewCountry ] = useState({ name:'', capital:'' })
    const [ localWeather, setLocalWeather ] = useState({})
    
    if (newCountry.name !== country.name) setNewCountry({ name: country.name, capital:country.capital })

    useEffect(() => {
        console.log('getting weather info...')
        const api_key = process.env.REACT_APP_API_KEY
        const dest = 'http://api.weatherstack.com/current?access_key='+api_key+'&query='+newCountry.capital+', '+newCountry.name
        axios
            .get(dest)
            .then(response => {
                console.log('Get weather!', response)
                setLocalWeather(response.data.current)
            })
    }, [ newCountry ])

    if ( !localWeather.hasOwnProperty('weather_icons') ) {
        console.log('localWeather is empty');
        return (
            <></>
        )
    } else {
        console.log('localWeather is NOT empty', localWeather);
        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>temperature: {localWeather.temperature} Celcius</p>
                {
                    localWeather.weather_icons.map((icon, i) => {
                        return <img src={icon} key={i} alt={localWeather.weather_descriptions[i]}/>
                    })
                }
                <p>wind: {localWeather.wind_speed} mph direction {localWeather.wind_dir}</p>
            </div>
        )
    }
    
}

export default Weather