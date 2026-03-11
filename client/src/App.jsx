<<<<<<< HEAD
import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Result from "./pages/Result"
import BuyCredit from "./pages/BuyCredit"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradint-to-b from-teal-50
    to-orange-50' >

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>
=======
import React from 'react'

const App = () => {
  return (
    <div>
      
>>>>>>> 60e22ffd06d408173c82f76ae1c8ac6b9c5c7df1
    </div>
  )
}

<<<<<<< HEAD
export default App
=======
export default App
>>>>>>> 60e22ffd06d408173c82f76ae1c8ac6b9c5c7df1
