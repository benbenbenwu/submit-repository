import React, { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onHandlder={() => setGood(good + 1)} />
      <Button text="neutral" onHandlder={() => setNeutral(neutral + 1)} />
      <Button text="bad" onHandlder={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App