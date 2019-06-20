import React from 'react'

const FilterInput = ({label, filter, setFilter, list, setNewList}) => {
  const handleFilter = (event) => {
    console.log('original: ', list)
    setFilter(event.target.value)
    console.log('filter', filter)
    let filteredList = list.filter(person => person['name'].toString().toLowerCase().includes(filter.toString().toLowerCase()))
    console.log('filterred: ', filteredList)
    setNewList(filteredList)
  }

  return (
    <div>
      {label}: <input value={filter} onChange={handleFilter}/>
    </div>
  )
}
export default FilterInput