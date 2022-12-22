import React from 'react'

const Total = ({ parts }) => {
  return (
    <>
      <h3>total  {parts.reduce((previousValue, currentValue) => previousValue += currentValue.exercises, 0)} of exercises</h3>
    </>
  )
}

export default Total