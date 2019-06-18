import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handler}) => { 
  return (
    <button onClick={handler()}> {text} </button>
  )
}

const VoteDisplay = (props) => { 
  return (
    <p> has {props.voteCount} votes </p>
  )
}

const AnecdoteDisplay = (props) => { 
  return (
    <p> {props.anecdote} </p>
  )
}

const App = ({anecdotes, startVotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(startVotes)

  const selectRandom = () => {  
    return() => {
      let value = Math.floor(Math.random() * 6)
      setSelected(value)  
    }
  }

  const voteForSelected = () => {  
    return() => {
      let copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
    }
  }

  return (
    <div>
      <AnecdoteDisplay anecdote={anecdotes[selected]} />
      <VoteDisplay voteCount={votes[selected]} />
      <Button text='vote' handler={voteForSelected} /> 
      <Button text='next anecdote' handler={selectRandom} /> 
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

const startVotes = Array(6).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} startVotes={startVotes} />,
  document.getElementById('root')
)