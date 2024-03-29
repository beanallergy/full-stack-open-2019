import React from 'react'

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
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

const Total = ({exercises}) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return (
    <b>total of {exercises.reduce(reducer)} exercises</b>
  )
}

const Course = ({course}) => {
  let exercises = course.parts.map((part) => part.exercises)
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={exercises} />
    </div>
  )
}

export default Course 