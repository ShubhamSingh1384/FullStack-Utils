import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MyCart from './components/MyCart'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<MyCart/>} />
      </Routes>
    </>
  )
}

export default App
