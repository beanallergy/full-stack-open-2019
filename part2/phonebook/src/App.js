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

  const newPersonFormHandler = (event) => {
    event.preventDefault()
    let names = persons.map(person => person['name'])
    names.includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : addNewPerson(newName , newNumber)
  }

  const addNewPerson = (name, number) => {
    let newPerson = {
      'name': name ,
      'number': number
    }
    setPersons(persons.concat(newPerson))
    personService.create(newPerson)
  }

  return (
    <div>
      <Header name='Phonebook' />
      <NewInput label='filter shown with' value={filter} setNewValue={setFilter} />

      <Header name='add a new' />
      <NewPersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} newPersonFormHandler={newPersonFormHandler} />

      <Header name='Numbers' />
      {filterPeople().map((person) => <PhonebookItem key={person['name']} item={person} deleteItemHandler={deletePersonHandler} /> )}
    </div>
  )
}

export default App