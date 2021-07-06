import React from 'react'

const Records = ({ records }) => {
  return (
    <div>
      {
        records.map((record) => {
          return <p key={record.name}>{record.name} {record.number}</p>
        })
      }
    </div>
  )
}

export default Records