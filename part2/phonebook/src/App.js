import React, { useState, useEffect } from 'react'
import PhonebookItem from './components/PhonebookItem'
import NewPersonForm from './components/NewPersonForm'
import NewInput from './components/NewInput'
import Notification from './components/Notification'
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
  const [ notiMsg, setNotiMsg ] = useState('Hello')
  const defaultErrorMsg = 'Something went wrong...'
  const [ successful, setSuccess ] = useState(true)

  const filterPeople = () => {
    return ( 
      persons.filter(person =>
        person['name'].toString().toLowerCase()
        .includes(filter.toString().toLowerCase())
      )
    )
  }

  const setNotification = (msg, success) => {
    setNotiMsg(msg)
    setSuccess(success)
    setTimeout(() => {setNotiMsg(null)}, 2000)
  }

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
      .catch(error => {
        console.log('GET initial data failed: ', error)
        setNotification(error.message ?? defaultErrorMsg, false)
      })
  }, [persons])

  const deletePersonHandler = (person) => {
    const nameToRemove = person['name']
    const indexToRemove = person['id']
    let confirmed = window.confirm(`Delete ${nameToRemove}?`)
    if (confirmed) {
      personService
        .remove(indexToRemove)
        .then(() => {
          setPersons(persons.filter((remain => remain.id !== indexToRemove)))
          setNotification(`${nameToRemove} deleted`, true)
        })
        .catch(error => {
          console.log('DELETE failed: ', error)
          setNotification(error.message ?? defaultErrorMsg, false)
        })
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
          setNotification(`Number of ${name} has been changed`, true)
        })
        .catch(error => {
          console.log('PUT update person failed: ', error)
          setNotification(`Information of ${name} has already been removed from server`, false)
        })
    }
  }

  const addNewPerson = (name, number) => {
    const newPerson = {
      'name': name ,
      'number': number
    }
    personService
      .create(newPerson)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNotification(`Added ${name}`, true)
      })
      .catch(error => {
        console.log('POST new person failed: ', error)
        setNotification(error.message ?? defaultErrorMsg, false)
      })
  }

  return (
    <div>
      <Header name='Phonebook' />
      <Notification message={notiMsg} successful={successful} />
      <NewInput label='filter shown with' value={filter} setNewValue={setFilter} />

      <Header name='add a new' />
      <NewPersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} newPersonFormHandler={newPersonFormHandler} />

      <Header name='Numbers' />
      {filterPeople().map((person) => <PhonebookItem key={person['name']} item={person} deleteItemHandler={deletePersonHandler} /> )}
    </div>
  )
}

export default App