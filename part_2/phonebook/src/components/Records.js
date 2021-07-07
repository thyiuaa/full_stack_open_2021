import React from 'react'

import Button from './Button'
import personsService from '../services/persons'

const Records = ({ records }) => {
  const deleteRecord = ( record ) => {
    if( window.confirm(`Delete ${record.name}`) ) {
      personsService
        .remove(record.id)
        .then(response => {
          console.log('A record is deleted')
        })
    } else {
      console.log('User cancelled record deletion.');
    }
  }

  return (
    <div>
      {
        records.map((record) => {
          return <p key={record.name}>
              {record.name} {record.number}
              <Button label='delete' clickHandler={() => deleteRecord(record)} />
            </p>
        })
      }
    </div>
  )
}

export default Records