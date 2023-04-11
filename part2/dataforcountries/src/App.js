import React, { useState, useEffect } from 'react'
//import React from 'react'
import NewInput from './components/NewInput'
import Countries from './components/Countries'
import apiService from './services/api'

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    apiService
      .getAll()
      .then(countriesdata => {
        setCountries(countriesdata)
      })
      .catch(error => {
        console.log('GET initial data failed: ', error)
      })
  }, [])

  //do not render anything if countries is still null
  if (!countries) {
    return null
  }

  const filterCountries = () => {
    console.log(nameFilter)
    let filtered = countries.filter(country => {
      return country['name']['common'] 
        && country['name']['common'].toLowerCase().includes(nameFilter.toLowerCase())
    })
    return filtered
  }

  return (
    <div>
      <NewInput label='find countries' value={nameFilter} setNewValue={setNameFilter} />
      <Countries countries={filterCountries()} setFilter={setNameFilter} />
    </div>
  )
}

export default App