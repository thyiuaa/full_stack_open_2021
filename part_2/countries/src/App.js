import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios'
import Search from './components/Search'
import Result from './components/Result';

function App() {
  const [ searchString, setSearchString ] = useState('')
  const [ allCountries, setAllCountries ] = useState([])
  const [ showCountries, setShowCountries ] = useState([])

  useEffect(() => {
    const dest = 'https://restcountries.eu/rest/v2/all'
    axios
      .get(dest)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (searchString === '') {
      setShowCountries(allCountries)
    } else {
      setShowCountries(allCountries.filter(country => {
        const regex = new RegExp(searchString, 'i')
        return country.name.search(regex) !== -1
      }))
    }
  }, [ searchString, allCountries ])

  return (
    <div>
      <Search searchString={searchString} setSearchString={setSearchString} />
      <Result showCountries={showCountries} setShowCountries={setShowCountries} setSearchString={setSearchString} />
    </div>
  );
}

export default App;
