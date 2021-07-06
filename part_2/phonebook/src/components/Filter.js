import React from 'react'

const Filter = ({ filterString, setFilterString, persons, displayRecords }) => {
  const handleFilterStringChange = (event) => {
    setFilterString(event.target.value)
    displayRecords(event.target.value, persons)
  }

  return (
    <div>
      filter shown with <input value={filterString} onChange={handleFilterStringChange}/>
    </div>
  )
}

export default Filter