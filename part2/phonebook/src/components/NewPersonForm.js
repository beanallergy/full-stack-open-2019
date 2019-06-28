import React from 'react'
import NewInput from './NewInput'
import personService from '../services/persons'


const NewPersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

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
    <form onSubmit={newPersonFormHandler}>
      <NewInput label='name' newValue={newName} setNewValue={setNewName} />
      <NewInput label='number' newValue={newNumber} setNewValue={setNewNumber} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default NewPersonForm 