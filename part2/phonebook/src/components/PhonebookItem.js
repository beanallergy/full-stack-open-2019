import React from 'react'

const PhonebookItem = ({item, deleteItemHandler}) => {
  
  return (
    <p>{item['name']} {item['number']} <button onClick={() => deleteItemHandler(item)}>delete</button> </p>
  )
}

export default PhonebookItem