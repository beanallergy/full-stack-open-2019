import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handler}) => { 
  return (
    <div>
      <button onClick={handler}> {text} </button>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const minAnecdotesIndex = 0
  const maxAnecdotesIndex = 6

  const selectRandom = () => {
    let value = Math.floor(Math.random() * 6)
    console.log(value)
    return() => {
      setSelected(value)  
      console.log('selected = ' + this.selected)
    }
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <Button text='next anecdote' handler={selectRandom}/> 
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)