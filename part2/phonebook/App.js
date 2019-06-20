import React, { useState } from 'react'
import People from './components/People'
import NewPersonForm from './components/NewPersonForm'
import NewInput from './components/NewInput'

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

  const filterPeople = () => {
    return ( 
      persons.filter(person => 
        person['name'].toString().toLowerCase()
        .includes(filter.toString().toLowerCase())
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
    </div>
  )
}

export default App