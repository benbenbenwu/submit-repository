import React from 'react'

const Persons = ({ filterString, persons }) => {
  return (
    <>
      {
        filterString
          ? persons.filter(({ name }) => name.toLowerCase().includes(filterString.toLowerCase())).map(({ name, number }) => <p key={name}>{name} {number}</p>)
          : persons.map(({ name, number }) => <p key={name}>{name} {number}</p>)
      }</>
  )
}

export default Persons