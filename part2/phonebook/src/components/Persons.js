import React from 'react'
import { del } from '../node'

const Persons = ({ filterString, persons, setPersons }) => {

  const onDeleteHandlder = async (id, name) => {
    alert(`Delete ${name}`)
    await del(id)
    await setPersons(persons.filter(person => person.id !== id))
  }

  return (
    <div>

      {
        !filterString
          ? persons.map(({ name, number, id }) => {
            return (
              <div key={id}>
                <p>{name} {number}</p>
                <button onClick={() => { onDeleteHandlder(id, name) }}>delete</button>
              </div>
            )
          })
          : persons.filter(({ name }) => name.toLowerCase().includes(filterString.toLowerCase()))
            .map(({ name, number, id }) => {
              return (
                <div key={id}>
                  <p>{name} {number}</p>
                  <button onClick={() => { onDeleteHandlder(id, name) }}>delete</button>
                </div>
              )
            })
      }
    </div>
  )
}

export default Persons