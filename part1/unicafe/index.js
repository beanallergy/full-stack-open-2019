import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const Header = (props) => {
  return (
    <h2>{props.title}</h2>
  )
}

const Button = (props) => {
  return (
    <button onClick={() => { props.setCounter(props.counter + 1) }}> {props.name} </button>
  )
}

const Statistic = (props) => {
  return (
    <tr><td>{props.text} </td><td>{props.counter}</td></tr>
  )
}

const Statistics = ({goodVal, neutralVal, badVal}) => {
  let sum = goodVal + neutralVal + badVal
  let avg = (goodVal*1 + neutralVal*0 + badVal*-1)/sum
  let positive = (goodVal/sum)*100 + '%'

  if (sum === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <div>
      <table><tbody>
      <Statistic text="good" counter={goodVal} />
      <Statistic text="neutral" counter={neutralVal} />
      <Statistic text="bad" counter={badVal} />
      <Statistic text="all" counter={sum} />
      <Statistic text="average" counter={avg} />
      <Statistic text="positive" counter={positive}/>
      </tbody></table>
    </div>
  )
}

const App = (props) => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="give feedback" />
      <Button setCounter={setGood} counter={good} name='good' />
      <Button setCounter={setNeutral} counter={neutral} name='neutral' />
      <Button setCounter={setBad} counter={bad} name='bad' />
      <Header title="statistics" />
      <Statistics goodVal={good} neutralVal={neutral} badVal={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))