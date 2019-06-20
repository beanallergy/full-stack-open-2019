import React, { useState } from 'react'
import People from './components/People'
import NewPersonForm from './components/NewPersonForm'

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const App = (props) => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    let names = persons.map(person => person['name'])
    names.includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ 'name': newName , 'number': newNumber}))
  }
  
  return (
    <div>
      <Header name='Phonebook' />
      <form onSubmit={addNewPerson}>
        <NewPersonForm label='name' newValue={newName} setNewValue={setNewName} />
        <NewPersonForm label='number' newValue={newNumber} setNewValue={setNewNumber} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header name='Numbers' />
      <People people={persons} />
    </div>
  )
}

export default App