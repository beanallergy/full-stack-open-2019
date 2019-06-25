import React from 'react'

const Country = ({country}) => {
  return (
    <div>
    <h1> {country['name']} </h1>
    <p> capital {country['capital']}</p>
    <p> population {country['population']}</p>
    <h2> languages </h2>
    <Languages languages={country['languages']} />
    </div>
  )
}

const Languages = ({languages}) => {
  return (
    <ul>
      {languages.map((language) => <li key={language['iso639_1']}> {language['name']} </li>)}
    </ul>
  )
}
export default Country