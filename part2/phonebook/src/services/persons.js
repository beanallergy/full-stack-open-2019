import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request
          .then(response => response.data)
          .catch(error => { console.log('Fetch failed: ', error) })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request
          .then(response => response.data)
          .catch(error => { console.log('Addition failed: ', error) })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request
          .then(response => response.data)
          .catch(error => { console.log('Update failed: ', error) })
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request
          .then(response => response.data)
          .catch(error => { console.log('Deletion failed: ', error) })
}

export default { getAll, create, update, remove }