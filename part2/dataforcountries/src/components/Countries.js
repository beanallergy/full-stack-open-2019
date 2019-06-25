import React from 'react'
import Country from './Country'

const Countries = ({countries}) => {
  return ((countries.length <= 10) 
  ? <>
    {countries.map((country) => <Country key={country['name']} country={country} /> )}
  </> 
  : <p> Too many matches, specify another filter </p>
  )
}

export default Countries 