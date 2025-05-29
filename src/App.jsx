import { Routes, Route } from 'react-router-dom'
import MainLayout from './assets/layouts/MainLayout'

function App() {

  return (
    <>
        {/* If user is logged in show Main-layout else Signin-layout */}
        <Routes>
          <Route path="/" element={<MainLayout />} />
        </Routes>
    </>
  )
}

export default App
