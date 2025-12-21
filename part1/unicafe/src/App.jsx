import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <th>
        {props.text}
      </th>
      <th>
        {props.total}
      </th>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = (props.good - props.bad) / props.all
  const percentage = props.good / props.all * 100

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine total={props.good} text={"good"}></StatisticLine>
          <StatisticLine total={props.neutral} text={"neutral"}></StatisticLine>
          <StatisticLine total={props.bad} text={"bad"}></StatisticLine>
          <StatisticLine total={props.all} text={"all"}></StatisticLine>
          <StatisticLine total={average} text={"average"}></StatisticLine>
          <StatisticLine total={percentage} text={"positive"}></StatisticLine>
        </tbody>
      </table>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
    const newAll = all + 1
    setAll(newAll)
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    const newAll = all + 1
    setAll(newAll)
  }

  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    const newAll = all + 1
    setAll(newAll)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text={"good"}></Button>
      <Button onClick={handleNeutral} text={"neutral"}></Button>
      <Button onClick={handleBad} text={"bad"}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}></Statistics>
    </div>
  )
}

export default App