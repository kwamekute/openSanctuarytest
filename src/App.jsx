import {useAuth} from './context/AuthContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import HomeListings from './components/homepagelistings';
import HostMain from './components/spacehost/hostmainpage';
import AddNewListing from './components/spacehost/addlisting';
import ListingDetails from './components/listingdetails';
import FilteredListings from './components/filteredlistings';
import SignUp from './components/authentication/signup';
import LogIn from './components/authentication/login';
import HostProfile from './components/spacehost/hostprofile';
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [tab, setActiveTab] = useState('Requests');
  const { user, setUser } = useAuth(); // store logged-in user+org here
  const location = useLocation();
  const navigate = useNavigate();
  const isHostListingPage = location.pathname === '/host/listing/create';

   const handleLogout = async () => {
    try {
      // ✅ Call backend logout route (to clear session)
      const res = await fetch("http://localhost:3000/signin/logout", {
        method: "POST",
        credentials: "include", // important if using cookies/session
      });

      if (res.ok) {
        // Optional: clear local user state
        setUser(null);
        navigate("/"); // redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };


  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Header
          handleLogout={handleLogout}
            tab={tab}
            SetActiveTab={setActiveTab}
            user={user} />
          <Routes>
            <Route
              path='/' element={<HomeListings />} />
            <Route
              path='/host' element={<HostMain
                tab={tab}
                 user={user}
              />} />
            <Route path="/host/listing/create" element={<AddNewListing setActiveTab={setActiveTab} user={user}/>} />
            <Route path="/host/listing/:id" element={<ListingDetails />} />
            <Route path="/host/filtered" element={<FilteredListings />} />
            <Route path="/signup" element={<SignUp  setUser={setUser}/> }/> 
            <Route path="/login" element ={<LogIn setUser={setUser}/>}/>
             <Route path="/host/profile" element={<HostMain tab={tab} user={user}/> }/>
          </Routes>


        </div>
        {!isHostListingPage && <Footer />}

      </div>

    </>
  )
}

export default App
