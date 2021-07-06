import React from 'react'

const Search = ({ searchString, setSearchString}) => {
    const handleSearchStringChange = (event) => {
        setSearchString(event.target.value)
    }
    return (
        <div>
            find countries <input value={searchString} onChange={handleSearchStringChange} />
        </div>
    )
}

export default Search