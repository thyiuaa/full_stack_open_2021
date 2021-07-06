import React from 'react'

import './Result.css';
import Details from './Details'
import ShowButton from './ShowButton';
import Weather from './Weather';

const Result = ({ showCountries, setShowCountries, setSearchString }) => {
    if (showCountries.length === 1) {
        return (
            <div>
                <Details country={showCountries[0]} />
                <Weather country={showCountries[0]} />
            </div>
        )
    } else if (showCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else {
        return (
            <div>
                {
                    showCountries.map((country) => {
                        return (
                            <p key={country.alpha3Code}>
                                {country.name}
                                <ShowButton country={country} setShowCountries={setShowCountries} setSearchString={setSearchString} />
                            </p>
                        )
                    })
                }
            </div>
        )
    }
}

export default Result