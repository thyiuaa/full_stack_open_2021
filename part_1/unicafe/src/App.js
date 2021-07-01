import React, { useState } from 'react'

const Title = (props) => {
  return (
    <h1>
      {props.title}
    </h1>
  )
}

const Button = ({ text, value, handleClick }) => {
  return (
    <button onClick={() => handleClick(value+1)}>
      {text}
    </button>
  )
}

const Buttons = (props) => {
  return (
    <div>
      {
        props.feedback_info.map((item, i) =>
          <Button {...item} key={i} />
        )
      }
    </div>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}

// a proper place to define a component
const Statistics = (props) => {
  if (props.all === 0){
    return (
      <p>
        No feedback given
      </p>
    )
  } else {
    return (
      <div>
        {props.feedback_info.map((item, i) =>
            <Statistic {...item} key={i} />
          )}
        {props.extra_info.map((item, i) =>
            <Statistic {...item} key={i} />
          )}
        
      </div>
    )
  }
}

const StatisticsTableRow = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const StatisticsTable = (props) => {
  if (props.all === 0){
    return (
      <p>
        No feedback given
      </p>
    )
  } else {
    return (
      <table>
        <tbody>
          {props.feedback_info.map((item, i) => (
              <StatisticsTableRow text={item.text} value={item.value} key={i} />
            ))}
          {props.extra_info.map((item, i) => (
              <StatisticsTableRow text={item.text} value={item.value} key={i} />
            ))}
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = good/all*100+"%"

  const title1 = "give feedback"
  const title2 = "statistics"
  const feedback_info = [
    { text: "good", value: good, handleClick: setGood },
    { text: "neutral", value: neutral, handleClick: setNeutral },
    { text: "bad", value: bad, handleClick: setBad },
  ]
  const extra_info = [
    { text: "all", value: all, handleClick: () => [] },
    { text: "average", value: average, handleClick: () => [] },
    { text: "positive", value: positive, handleClick: () => [] }
  ]

  return (
    <div>
      <Title title={title1} />
      <Buttons feedback_info={feedback_info} />
      <Title title={title2} />
      <StatisticsTable all={all} feedback_info={feedback_info} extra_info={extra_info} />
    </div>
  )
}

export default App
