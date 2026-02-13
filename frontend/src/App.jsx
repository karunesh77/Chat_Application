import React from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './home/page'
import ChatPage from './chat/page'
import SignupPage from './signup/page'
import LoginPgae from './login/page'

const App = () => {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/chats' element={<ChatPage/>}></Route>
      <Route path='/register' element = {<SignupPage/>}></Route>
      <Route path='/login' element = {<LoginPgae  />}></Route>

     


    </Routes>
    </>
  )
}

export default App