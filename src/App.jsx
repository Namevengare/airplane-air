import { useState } from 'react'
import './App.css'
import BookingForm from './components/BookingForm'
import FlightSelection from './components/FlightSelection'
import BookingConfirmation from './components/BookingConfirmation'

function App() {
  const [currentStep, setCurrentStep] = useState('search') // search, select, confirmed
  const [searchData, setSearchData] = useState(null)
  const [bookingData, setBookingData] = useState(null)

  const handleSearch = (formData) => {
    setSearchData(formData)
    setCurrentStep('select')
  }

  const handleFlightSelect = (data) => {
    setBookingData(data)
    setCurrentStep('confirmed')
  }

  const handleBackToSearch = () => {
    setCurrentStep('search')
  }

  const handleNewBooking = () => {
    setSearchData(null)
    setBookingData(null)
    setCurrentStep('search')
  }

  return (
    <div className="container">
      {currentStep === 'search' && (
        <BookingForm onBookingSubmit={handleSearch} />
      )}
      {currentStep === 'select' && (
        <FlightSelection
          searchData={searchData}
          onFlightSelect={handleFlightSelect}
          onBack={handleBackToSearch}
        />
      )}
      {currentStep === 'confirmed' && (
        <BookingConfirmation
          bookingData={bookingData}
          onNewBooking={handleNewBooking}
        />
      )}
    </div>
  )
}

export default App
