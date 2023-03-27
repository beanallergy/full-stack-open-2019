import { useState } from 'react'

const Header = ({title}) => {
  return (
    <h2>{title}</h2>
  )
}

const Button = ({name, counter, setCounter}) => {
  return (
    <button onClick={() => { setCounter(counter + 1) }}> {name} </button>
  )
}

const StatisticLine = ({text, counter}) => {
  return (
    <tr><td>{text} </td><td>{counter}</td></tr>
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
      <StatisticLine text="good" counter={goodVal} />
      <StatisticLine text="neutral" counter={neutralVal} />
      <StatisticLine text="bad" counter={badVal} />
      <StatisticLine text="all" counter={sum} />
      <StatisticLine text="average" counter={avg} />
      <StatisticLine text="positive" counter={positive}/>
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
      <Button name='good' counter={good} setCounter={setGood}/>
      <Button name='neutral' counter={neutral} setCounter={setNeutral}/>
      <Button name='bad' counter={bad} setCounter={setBad}/>
      <Header title="statistics" />
      <Statistics goodVal={good} neutralVal={neutral} badVal={bad}/>
    </div>
  )
}

export default App;