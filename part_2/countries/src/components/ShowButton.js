import React from 'react'

const ShowButton = ({ country, setShowCountries, setSearchString }) => {
    const handleClick = () => {
        setShowCountries([ country ])
        setSearchString(country.name)
    }
    return (
        <button onClick={handleClick}>
            show
        </button>
    )
}

export default ShowButton