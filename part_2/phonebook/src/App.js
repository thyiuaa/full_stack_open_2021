import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString ] = useState('')
  const [ showRecords, setShowRecords ] = useState(persons)

  const handleInputNameChange = (event) => setNewName(event.target.value)
  const handleInputNumberChange = (event) => setNewNumber(event.target.value)
  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    if (newName !== '') {
      const personObj = { name: newName, number: newNumber }
      const newPersons = persons.concat(personObj)
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
      displayRecords(filterString, newPersons)
    }
  }
  const handleFilterStringChange = (event) => {
    setFilterString(event.target.value)
    displayRecords(event.target.value, persons)
  }

  const displayRecords = (filterString, persons) => {
    if (filterString === '') {
      setShowRecords(persons)
    } else {
      const filteredPersons = persons.filter(person => {
        return (person.name.search(filterString) !== -1)
      })
      setShowRecords(filteredPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterString} onChange={handleFilterStringChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        showRecords.map((record) => {
          return <p key={record.name}>{record.name} {record.number}</p>
        })
      }
    </div>
  )
}

export default App
