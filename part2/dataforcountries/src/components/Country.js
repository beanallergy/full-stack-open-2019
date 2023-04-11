import React from 'react'

const Country = ({country}) => {
  console.log('flag', country['flag'])
  return (
    <div>
    <h1> {country['name']['common']} </h1>
    <p> capital {country['capital']}</p>
    <p> population {country['population']}</p>
    <h2> languages </h2>
    <Languages languages={country['languages']} />
    {/* <img src={country['flag']} alt="Flag of country" /> */}
    <p> flag of country {country['flag']}</p>
    </div>
  )
}

const Languages = ({languages}) => {
  let langList = Object.values(languages)
  return (
    <ul>
      {langList.map((language, i) => <li key={i}> {language} </li>)}
    </ul>
  )
}
export default Country