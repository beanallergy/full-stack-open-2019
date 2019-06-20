import React, { useState } from 'react'
import People from './components/People'
import NewPersonForm from './components/NewPersonForm'
import FilterInput from './components/FilterInput'

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const App = (props) => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellaspop', number: '040-123456' },
    { name: 'Ada Loveart', number: '39-44-5323523' },
    { name: 'Dan Adamov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
      <FilterInput label='filter shown with' filter={filter} setFilter={setFilter} list={persons} setNewList={setPersons} />

      <Header name='add a new' />
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