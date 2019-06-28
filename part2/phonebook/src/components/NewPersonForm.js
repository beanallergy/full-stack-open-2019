import React from 'react'
import NewInput from './NewInput'

const NewPersonForm = ({newName, setNewName, newNumber, setNewNumber, newPersonFormHandler}) => {
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