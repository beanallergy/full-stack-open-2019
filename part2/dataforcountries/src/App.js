import React, { useState, useEffect } from 'react'
import NewInput from './components/NewInput'
import Countries from './components/Countries'
import axios from 'axios'

const App = (props) => {
  const [ countries, setCountries] = useState([])
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect (() => {
    axios
      .get('https://restcountries.com/v3.1/all')
        .then(response => {setCountries(response.data)})
      .catch(error => {console.log('GET initial data failed: ', error)
      })
  }, [])

  // do not render anything if countries is still null
  if (!countries) { 
    return null
  }

  const filterCountries = () => {
    // TODO: https://restcountries.com/v3.1/name/{nameFilter}
    let filtered = countries.filter((country) =>
      country['name']['common']?.toString().toLowerCase().includes(nameFilter.toString().toLowerCase())
    )
    return filtered
  }
  
  return (
    <div>
      <NewInput label='find countries' value={nameFilter} setNewValue={setNameFilter}/>
      <Countries countries={filterCountries()} setFilter={setNameFilter}/>
    </div>
  )
}

export default App