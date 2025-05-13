import React from 'react'
import Header from '../partials/Header'
import Sidebar from '../partials/Sidebar'
import Footer from '../partials/Footer'
import EventsOverview from '../pages/EventsOverview'

const MainLayout = () => {
  return (
    <>
        <div className="wrapper">
            <Header />
            <Sidebar />

            <EventsOverview />

            <Footer />
        </div>
    </>
  )
}

export default MainLayout
