import React from 'react'
import Country from './Country'

const Countries = ({countries, setFilter}) => {
  console.log('result', countries)
  if (countries.length === 1) {
      return <Country country={countries[0]} />
  }
  else if (countries.length > 10) {
    return (
      <p> Too many matches, specify another filter </p>
    )
  }
  else if (1 < countries.length < 10) {
    return (
      countries.map((country) => <CountryInList key={country['name']['common']} country={country} setFilter={setFilter} /> )
    )
  }
}

const CountryInList = ({country, setFilter}) => {
  function showCountryDetails () {
    console.log(country['name']['common'], 'clicked')
    setFilter(country['name']['common'])
  }
  return (
    <p>{country['name']['common']} <button onClick={showCountryDetails}>show</button> </p>
  )
}


export default Countries 