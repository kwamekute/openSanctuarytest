import { Routes, Route } from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'
import HomeListings from './components/homepagelistings'
import HostMain from './components/spacehost/hostmainpage'
import AddNewListing from './components/spacehost/addlisting'
import SignUp from './components/authentication/signup'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [tab, setActiveTab] = useState('Requests');
   const [user, setUser] = useState(null); // store logged-in user+org here
  const location = useLocation();

  const isHostListingPage = location.pathname === '/host/listing/create';

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
            <Route path="/host/listing/create" element={<AddNewListing />} />
            <Route path="/signup" element={<SignUp  setUser={setUser}/> }/> 
          </Routes>


        </div>
        {!isHostListingPage && <Footer />}

      </div>

    </>
  )
}

export default App
