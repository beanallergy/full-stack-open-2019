import React, { useState, useEffect } from 'react'
import PhonebookItem from './components/PhonebookItem'
import NewPersonForm from './components/NewPersonForm'
import NewInput from './components/NewInput'
import personService from './services/persons'

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

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const filterPeople = () => {
    return ( 
      persons.filter(person =>
        person['name'].toString().toLowerCase()
        .includes(filter.toString().toLowerCase())
      )
    )
  }

  const deletePersonHandler = (person) => {
    let confirmed = window.confirm(`Delete ${person['name']}?`)
    if (confirmed) {
      const indexToRemove = person['id']
      personService.remove(indexToRemove)
      let updated = persons.filter((remain => remain.id !== indexToRemove))
      setPersons(updated)
    }
  }

  return (
    <div>
      <Header name='Phonebook' />
      <NewInput label='filter shown with' value={filter} setNewValue={setFilter} />

      <Header name='add a new' />
      <NewPersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <Header name='Numbers' />
      {filterPeople().map((person) => <PhonebookItem key={person['name']} item={person} deleteItemHandler={deletePersonHandler} /> )}
    </div>
  )
}

export default App