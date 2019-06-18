import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({title}) => {
  return (
    <h2>{title}</h2>
  )
}

const Button = ({text, handler}) => {
  return (
    <button onClick={handler()}> {text} </button>
  )
}

const AnecdoteDisplay = ({anecdotes, votes, index}) => {
  return (
    <>
    <div> {anecdotes[index]} </div>
    <div> has {votes[index]} votes </div>
    </>
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
    let copy = [...votes]
    copy[selected] += 1
    return() => setVotes(copy)
  }

  const getMostVoteIndex = () => {
    let mostIndex = 0
    for (var i = 0; i < 6; i++) {
      if (votes[i] > votes[mostIndex]) { mostIndex=i }
    }
    return (mostIndex)
  }

  return (
    <div>
      <Header title='Anecdote of the day' />
      <AnecdoteDisplay anecdotes={anecdotes} votes={votes} index={selected} />
      <Button text='vote' handler={voteForSelected} /> 
      <Button text='next anecdote' handler={selectRandom} /> 
      <Header title='Anecdote with most vote' />
      <AnecdoteDisplay anecdotes={anecdotes} votes={votes} index={getMostVoteIndex()} />
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