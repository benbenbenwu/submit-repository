import React, { useState } from 'react'
import { getAll, create, update } from '../node'

const PersonForm = ({ persons, setPersons, setSuccessMessage, setErrorMessage }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (persons.some(({ name }) => newName === name)) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const person = persons.find(p => p.name === newName)
      await update(person.id, { ...person, number: newNumber })
        .then(data => {
          setSuccessMessage(`Update ${newName} new number success!`)
          setTimeout(() => {
            setSuccessMessage('')
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from server!`)
          setTimeout(() => {
            setErrorMessage('')
          }, 3000)
        })


    } else {
      const newObj =
        await create({ name: newName, number: newNumber })
          .then(data => {
            setSuccessMessage(`Added ${newName} success!`)
            setTimeout(() => {
              setSuccessMessage('')
            }, 3000)
            return data
          })
      setPersons([...persons, newObj.data])

    }
    setNewName('')
    setNewNumber('')
    await getAll()
      .then(res => setPersons(res.data))
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