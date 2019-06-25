import React, { useState, useEffect } from 'react'
import NewInput from './components/NewInput'
import Countries from './components/Countries'
import axios from 'axios';

const App = (props) => {
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect (() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)})
  }, [])
  
  const filterCountries = () => {
    let filtered = countries.filter(country => 
        country['name'].toString().toLowerCase()
        .includes(filter.toString().toLowerCase())
    )
    return filtered
  }
  
  return (
    <div>
      <NewInput label='find countries' value={filter} setNewValue={setFilter}/>
      <Countries countries={filterCountries()} />
    </div>
  )
}

export default App