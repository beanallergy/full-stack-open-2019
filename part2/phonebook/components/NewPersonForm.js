import React from 'react'

const NewPersonForm = ({label, newValue, setNewValue}) => {
  const handleChange = (event) => {
    setNewValue(event.target.value)
  }

  return (
    <div>
      {label}: <input value={newValue} onChange={handleChange}/>
    </div>
  )
}
export default NewPersonForm 