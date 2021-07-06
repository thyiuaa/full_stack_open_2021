import React, { useState , useEffect} from 'react'
import axios from 'axios'

import Records from './components/Records'
import Form from './components/Form'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ showRecords, setShowRecords ] = useState(persons)
  const [ filterString, setFilterString ] = useState('')

  useEffect(() => {
    const dest = "http://localhost:3001/persons"
    axios
      .get(dest)
      .then(response => {
        console.log("data fetched!", response.data)
        setPersons(response.data)
        displayRecords('', response.data)
      })
  }, [])

  const displayRecords = (filterString, persons) => {
    if (filterString === '') {
      setShowRecords(persons)
    } else {
      const regex = new RegExp(filterString, 'i')
      const filteredPersons = persons.filter(person => {
        return (person.name.search(regex) !== -1)
      })
      setShowRecords(filteredPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterString={filterString}
        setFilterString={setFilterString}
        persons={persons}
        displayRecords={displayRecords}
      />
      <h2>add a new</h2>
      <Form
        persons={persons}
        setPersons={setPersons}
        displayRecords={displayRecords}
        filterString={filterString}
      />
      <h2>Numbers</h2>
      <Records records={showRecords} />
    </div>
  )
}

export default App
