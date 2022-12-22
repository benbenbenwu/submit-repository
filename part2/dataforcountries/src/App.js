import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')

  const filterCountries = (fs) => {
    if (!fs) return
    const filterArray = countries
      .filter(({ name }) => name.common.toLowerCase().includes(fs.toLowerCase()))
      .map(({ name, tld, area, capital, languages, flags }) => ({
        id: tld[0],
        name: name.common,
        area,
        capital,
        languages,
        flag: flags['svg']
      }))

    if (filterArray.length > 10) {
      return <p>Too many countries,specify another filter</p>
    } else if (filterArray.length === 1) {
      return filterArray.map(({ id, area, capital, name, languages, flag }) => {
        return <div key={id}>
          <h1>{name}</h1>
          <p>area {area}</p>
          <p>capital {capital}</p>
          <p>languages:</p>
          <ul>
            {
              Object.values(languages).map((language, index) => <li key={index}>{language}</li>)
            }
          </ul>
          <img src={flag} alt={`${name} flag`} style={{ width: 300, height: 200 }} />
        </div>
      })
    } else if (filterArray.length > 0 && filterArray.length <= 10) {
      return filterArray.map(({ id, name }) => {
        return <div key={id}>
          <span>{name}</span><button onClick={() => { setFilterString(name) }}>show</button>
        </div>
      })
    }

  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))

  }, [])

  return (
    <div>
      find countries<input value={filterString} onChange={(e) => {
        setFilterString(e.target.value)
        filterCountries()
      }} />
      {filterCountries(filterString)}
    </div>
  )
}

export default App