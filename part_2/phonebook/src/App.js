import React, { useState , useEffect} from 'react'

import Records from './components/Records'
import Form from './components/Form'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ showRecords, setShowRecords ] = useState(persons)
  const [ filterString, setFilterString ] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        console.log("data fetched!", persons)
        setPersons(persons)
      })
  }, [])

  useEffect(() => {
    if (filterString === '') {
      setShowRecords(persons)
    } else {
      const regex = new RegExp(filterString, 'i')
      const filteredPersons = persons.filter(person => {
        return (person.name.search(regex) !== -1)
      })
      setShowRecords(filteredPersons)
    }
  }, [ filterString, persons ])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterString={filterString}
        setFilterString={setFilterString}
      />
      <h2>add a new</h2>
      <Form
        persons={persons}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Records
        records={showRecords}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App
