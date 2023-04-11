import React, { useState, useEffect } from 'react'
//import React from 'react'
import NewInput from './components/NewInput'
import Countries from './components/Countries'
import apiService from './services/api'

const App = (props) => {
  const [ countries, setCountries] = useState([])
  const [ nameFilter, setNameFilter ] = useState('')

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

  console.log('all', countries)

  
  const filterCountries = () => {
    // TODO: https://restcountries.com/v3.1/name/{nameFilter}
    //let filtered=countries.filter(c => c['name'] && c['name']['common'] && c['name']['common'].includes(nameFilter.toLowerCase()))
    // let filtered = countries.map(item => ({
    //   ...item,
    //   name: item['name'].filter(
    //     child => child['common']?.toString().toLowerCase()
    //     .includes(nameFilter.toString().toLowerCase())
    //   )
    // }).filter(item => item['name']))
    var filtered = countries.slice(201,210)
    //var filtered = countries.slice(201,202)
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