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
      ? updateExistingPerson(newName , newNumber)
      : addNewPerson(newName , newNumber)
  }

  const updateExistingPerson = (name, number) => {
    let confirmed = window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)
    if (confirmed) {
      const existing = persons.find(person => person.name === name)
      const updatedId = existing['id']
      const updatedContent = {...existing, 'name': name, 'number': number}
      personService
        .update(updatedId, updatedContent)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updatedId ? person : returnedPerson))
          })
    }
  }

  const addNewPerson = (name, number) => {
    const newPerson = {
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