import { Routes, Route } from 'react-router-dom'
import MainLayout from './assets/layouts/MainLayout'
import EventsOverview from './assets/pages/EventsOverview'
import EventDetails from './assets/pages/EventDetails'
import BookingModal from './assets/partials/components/BookingModal'
import SignInModal from './assets/partials/components/SignInModal'

function App() {

  return (
    <>
        {/* If user is logged in show Main-layout else Signin-layout */}
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<EventsOverview />} />
            <Route path="event-details/:id" element={<EventDetails />} />
            <Route Path="booking-form/:id" element={<BookingModal />} />
            <Route path="sign-in" element={<SignInModal />} />
          </Route>
        </Routes>
    </>
  )
}

export default App
