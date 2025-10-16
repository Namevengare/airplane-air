import { useState, useEffect } from 'react'
import '../style/FlightSelection.css'

function FlightSelection({ searchData, onFlightSelect, onBack }) {
  const [flights, setFlights] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)

  useEffect(() => {
    fetch('/flightDatabase.json')
      .then(response => response.json())
      .then(data => {
        const availableFlights = data.flights.filter(
          flight => flight.from === searchData.fromCode && flight.to === searchData.toCode
        )
        setFlights(availableFlights)
      })
      .catch(error => console.error('Error loading flights:', error))
  }, [searchData])

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight)
  }

  const handleConfirm = () => {
    if (selectedFlight) {
      onFlightSelect({
        ...searchData,
        selectedFlight
      })
    }
  }

  return (
    <div className="flight-selection">
      <h1>Available Flights</h1>
      <h2>{searchData.from} → {searchData.to}</h2>
      
      {flights.length === 0 ? (
        <div className="no-flights">
          <p>😔 No flights available for this route</p>
          <p>Please try a different destination</p>
        </div>
      ) : (
        <div className="flights-list">
          {flights.map(flight => (
            <div
              key={flight.id}
              className={`flight-card ${selectedFlight?.id === flight.id ? 'selected' : ''}`}
              onClick={() => handleFlightSelect(flight)}
            >
              <div className="flight-header">
                <div className="flight-number">{flight.id}</div>
                <div className="flight-price">${flight.price}</div>
              </div>
              <div className="flight-route">
                <div className="flight-time">{flight.departureTime}</div>
                <div className="flight-arrow">→</div>
                <div className="flight-time">{flight.arrivalTime}</div>
              </div>
              <div className="flight-details">
                <div className="flight-detail-item">
                  <span>⏱️ {flight.duration}</span>
                </div>
                <div className="flight-detail-item">
                  <span>✈️ {flight.airline}</span>
                </div>
                <div className="flight-detail-item">
                  <span>👥 {searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="button-group">
        <button onClick={onBack} className="btn-secondary">
          Back to Search
        </button>
        <button
          onClick={handleConfirm}
          className="btn-primary"
          disabled={!selectedFlight}
        >
          Confirm Flight
        </button>
      </div>
    </div>
  )
}

export default FlightSelection
