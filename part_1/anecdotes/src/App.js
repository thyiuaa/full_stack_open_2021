import React, { useState } from 'react'

const Title = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      {props.text}
      <br/> has {props.votes} votes
    </div>
  )
}

const Button = (props) => {
  console.log(props.param)
  return (
    <button onClick={() => props.handleClick(props.param)}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [topVoted, setTopVoted] = useState(0)

  const next_anecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const vote_anecdote = (index) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
    if (copy[index] > votes[topVoted]) {
      setTopVoted(index)
    }
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" handleClick={vote_anecdote} param={selected} />
      <Button text="next anecdote" handleClick={next_anecdote} />  
      <Title text="Anecdote with the most votes" />
      <Anecdote text={anecdotes[topVoted]} votes={votes[topVoted]} />
    </div>
  )
}

export default App