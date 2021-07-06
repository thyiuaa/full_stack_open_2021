import React, { useState } from 'react'

const Form = ({ persons, setPersons, displayRecords, filterString }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
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
  )
}

export default Form