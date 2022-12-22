import React from 'react'
import Header from './Header'
import Total from './Total'
import Content from './Content'

const Course = ({ course }) => {

  const { name, parts } = course
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default Course
