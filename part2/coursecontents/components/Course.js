import React from 'react'

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({parts}) => {
  return (
    parts.map((contentPart, i) => <Part key={i} part={contentPart} />)
  )
}

const Part = ({part}) => {
  return (
    <p>
    {part['name']} {part['exercises']}
    </p>
  )
} 

const Total = ({parts}) => {   
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course 