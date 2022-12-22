import React, { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (persons.some(({ name }) => newName === name)) {
      return alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, { name: newName, number: newNumber }])
      setNewName('')
      setNewNumber('')
    }
  }
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm