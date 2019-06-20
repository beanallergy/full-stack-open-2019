import React, { useState } from 'react'
import People from './components/People'

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault()
    let names = persons.map(person => person['name'])
    names.includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ 'name': newName })) 
  }
  
  return (
    <div>
      <Header name='Phonebook' />
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
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