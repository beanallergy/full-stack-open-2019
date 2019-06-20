import React from 'react'
import NewInput from './NewInput'

const NewPersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

  const addNewPerson = (event) => {
    event.preventDefault()
    let names = persons.map(person => person['name'])
    names.includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ 'name': newName , 'number': newNumber}))
  }

  return (
    <form onSubmit={addNewPerson}>
      <NewInput label='name' newValue={newName} setNewValue={setNewName} />
      <NewInput label='number' newValue={newNumber} setNewValue={setNewNumber} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default NewPersonForm 