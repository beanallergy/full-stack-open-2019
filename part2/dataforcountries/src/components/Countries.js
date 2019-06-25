import React from 'react'
import Country from './Country'

const Countries = ({countries}) => {
  if (countries.length === 1) {
    return (
    <Country key={countries[0]['name']} country={countries[0]} />
    )
  }
  else if (countries.length > 10) {
    return (
    <p> Too many matches, specify another filter </p>
    )
  }
  else if (1 < countries.length < 10) {
    return (
    <>
    {countries.map((country) => <CountryInList key={country['name']} country={country} /> )}
    </>
    )
  }
}

const CountryInList = ({country}) => {
  return (
    <p>{country['name']}</p>
  )
}

export default Countries 