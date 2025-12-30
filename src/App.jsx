import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Cart from './pages/cart/cart'
import PlaceOrder from './pages/placeorder/placeorder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'
import Verify from "./pages/Verify/Verify";

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path ='/Verify' element={<Verify/>}/>
          <Route path='/myOrders' element={<MyOrders/>}/>
        </Routes>
      </div>

      <Footer/>
    </>
  )
}

export default App
