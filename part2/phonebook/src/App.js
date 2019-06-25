import React, { useState, useEffect } from 'react'
import People from './components/People'
import NewPersonForm from './components/NewPersonForm'
import NewInput from './components/NewInput'
import axios from 'axios';

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const App = (props) => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  console.log(persons)
  useEffect (() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {setPersons(response.data)})
  }, [])
  
  const filterPeople = () => {
    return ( 
      persons.filter(person => 
        person['name'].toString().toLowerCase()
        .includes(filter.toString( ).toLowerCase())
      )
    )
  }
  
  return (
    <div>
      <Header name='Phonebook' />
      <NewInput label='filter shown with' value={filter} setNewValue={setFilter}/>

      <Header name='add a new' />
      <NewPersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>

      <Header name='Numbers' />
      <People people={filterPeople()} />
      {/* <People people={persons} /> */}
    </div>
  )
}

export default App