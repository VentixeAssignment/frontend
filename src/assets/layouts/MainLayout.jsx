import React, { useRef } from 'react'
import Header from '../partials/Header'
import Sidebar from '../partials/Sidebar'
import Footer from '../partials/Footer'
import EventsOverview from '../pages/EventsOverview'
import EventDetails from '../pages/EventDetails'
import { Outlet } from 'react-router-dom'
import SignInModal from '../partials/components/SignInModal'

const MainLayout = () => {

  const dialogRef = useRef(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }


  return (
    <>      
        <div className="wrapper">
            <Header />
            <Sidebar signInClicked={openModal} />
            
            <Outlet />

            <Footer />


            <SignInModal dialogRef={dialogRef} />
        </div>
    </>
  )
}

export default MainLayout
