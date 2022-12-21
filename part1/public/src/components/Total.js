import React from 'react'

const Total = ({ parts }) => {
  return (
    <div>
      <p>Number of exercises {parts.reduce((previousValue, currentValue) => previousValue += currentValue.exercises, 0)}</p>
    </div>
  )
}

export default Total