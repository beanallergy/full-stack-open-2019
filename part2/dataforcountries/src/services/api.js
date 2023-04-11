import axios from 'axios'
const baseUrl = '/all?fields=name,area,population,capital,flag,languages'

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
// eslint-disable-next-line
export default { getAll }