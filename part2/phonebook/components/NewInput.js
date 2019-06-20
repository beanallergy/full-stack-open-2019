import React from 'react'

const NewInput = ({label, newValue, setNewValue}) => {
  const handleChange = (event) => {
    setNewValue(event.target.value)
  }

  return (
    <div>
      {label}: <input value={newValue} onChange={handleChange}/>
    </div>
  )
}
export default NewInput 