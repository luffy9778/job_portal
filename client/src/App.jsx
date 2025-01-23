import { useState } from 'react'
import "./index.css"
import { Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbaruser from './components/Navbaruser'
import Home from './pages/Home'


function App() {

  return (
    <>
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/navbar" element={<Navbaruser/>} />
      <Route path="/" element={<Home/>} />

    </Routes>
    </>
  )
}

export default App
