import { Routes, Route } from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'
import HomeListings from './components/homepagelistings'
import HostMain from './components/spacehost/hostmainpage'

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Header />
          <Routes>
            <Route path='/' element={<HomeListings />} />
            <Route path='/host' element={<HostMain />} />
          </Routes>


        </div>
        <Footer />
      </div>

    </>
  )
}

export default App
