import React from 'react'

const People = ({people}) => {
  return (
  <>
    {people.map((person) => <Person key={person['name']} person={person} /> )}
  </>
  )
}

const Person = ({person}) => {
  return (
    <p>{person['name']} {person['number']}</p>
  )
}

export default People 