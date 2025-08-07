import { Routes, Route } from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'
import HomeListings from './components/homepagelistings'
import HostMain from './components/spacehost/hostmainpage'
import { useState } from 'react'

function App() {
  const [tab, setActiveTab] = useState('Requests');

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Header
            tab={tab}
            SetActiveTab={setActiveTab} />
          <Routes>
            <Route
              path='/' element={<HomeListings />} />
            <Route
              path='/host' element={<HostMain
                tab={tab}
              />} />

          </Routes>


        </div>
        <Footer />
      </div>

    </>
  )
}

export default App
