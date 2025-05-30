import React from 'react'
import Header from '../partials/Header'
import Sidebar from '../partials/Sidebar'
import Footer from '../partials/Footer'
import EventsOverview from '../pages/EventsOverview'
import EventDetails from '../pages/EventDetails'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>      
        <div className="wrapper">
            <Header />
            <Sidebar />
            
            <Outlet />

            <Footer />
        </div>
    </>
  )
}

export default MainLayout
