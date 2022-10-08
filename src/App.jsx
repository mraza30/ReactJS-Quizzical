import React, { useState } from 'react'
import leftDown from './assets/leftDown.png'
import rightUp from './assets/rightUp.png'
import Landing from './components/Landing'
import QuestionLanding from './components/QuestionLanding'

export default function App() {
  
  const [isQuizStart, changeQuizState] = useState(false)

  const startQuiz = () => {
    localStorage.clear()
    changeQuizState(prevState => !prevState)
  }

  return (
    <div id='app' className='relative bg-transparent'>
      {isQuizStart ? <QuestionLanding /> : <Landing startQuiz={startQuiz} />}
      <img src={leftDown} alt="bg.right.fixed" className='fixed left-0 bottom-0 -z-10' />
      <img src={rightUp} alt="bg.left.fixed" className='fixed right-0 top-0 -z-10' />
    </div>
  )
}
