import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const Header = (props) => {
  return (
    <h2>{props.title}</h2>
  )
}

const App = (props) => {

  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="give feedback" />
      <button onClick={() => { setGood(good + 1) }}> good </button>
      <button onClick={() => { setNeutral(neutral + 1) }}> neutral </button>
      <button onClick={() => { setBad(bad + 1) }}> bad </button>
      <Header title="statistics" />
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))