import React from 'react'
import CountDownTimer from './components/CounDownTimer'
import TaskMangement from './components/TaskManagement'
import Quotes from './components/Quotes'

const App = () => {
  return (
    <>
      <CountDownTimer/>
      <div className='app-container container mt-4'>
        <Quotes/>
      </div>
      <TaskMangement/>
    </>
  )
}

export default App