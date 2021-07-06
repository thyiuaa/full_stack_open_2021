import React, { useState, useEffect } from "react";

import axios from "axios";
import './Weather.css'

const Weather = ({ country }) => {
    const [ newCountry, setNewCountry ] = useState('')
    const [ localWeather, setLocalWeather ] = useState({})
    
    if (newCountry !== country.name) setNewCountry(country.name)

    useEffect(() => {
        console.log('getting weather info...')
        const api_key = process.env.REACT_APP_API_KEY
        const dest = 'http://api.weatherstack.com/current?access_key='+api_key+'&query='+country.capital+', '+country.name
        axios
            .get(dest)
            .then(response => {
                console.log('Get weather!', response)
                setLocalWeather(response.data.current)
            })
    }, [ newCountry ])

    if (localWeather.weather_icons === undefined) {
        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>temperature: {localWeather.temperature} Celcius</p>
                <p>wind: {localWeather.wind_speed} mph direction {localWeather.wind_dir}</p>
            </div>
        )
    } else {
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