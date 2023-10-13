import React from 'react'
import Navbar from '../../Components/client/landingPage/navBar'
import Footer from '../../Components/client/landingPage/footer'
import { Outlet } from 'react-router-dom'

function UserHome() {
  return (
    <div>
       <Navbar/>
       <Outlet/>
       <Footer/>
    </div>
  )
}

export default UserHome