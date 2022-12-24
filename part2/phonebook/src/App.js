import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { getAll } from './node'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterString, setFilterString] = useState('')

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    const getPersons = async () => getAll().then(res => setPersons(res.data))
    getPersons()
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && <h2 className='message success'>{successMessage}</h2>}
      {errorMessage && <h2 className='message error'>{errorMessage}</h2>}
      <Filter value={filterString} onChange={(e) => setFilterString(e.target.value)} />
      <PersonForm persons={persons} setPersons={setPersons} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
      <h2>Numbers</h2>
      <Persons filterString={filterString} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App