import Footer from './components/footer'
import Header from './components/header'
import HomeListings from './components/homepagelistings'

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Header />
          <HomeListings />

        </div>
        <Footer />
      </div>

    </>
  )
}

export default App
