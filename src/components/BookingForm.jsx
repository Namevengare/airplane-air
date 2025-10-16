import { useState, useEffect } from 'react'
import '../style/BookingForm.css'

function BookingForm({ onBookingSubmit }) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  })
  const [airports, setAirports] = useState([])
  const [fromSuggestions, setFromSuggestions] = useState([])
  const [toSuggestions, setToSuggestions] = useState([])
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const [selectedFromAirport, setSelectedFromAirport] = useState(null)
  const [selectedToAirport, setSelectedToAirport] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetch('/flightDatabase.json')
      .then(response => response.json())
      .then(data => setAirports(data.airports))
      .catch(error => console.error('Error loading airports:', error))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'from') {
      setSelectedFromAirport(null)
      if (value.length > 0) {
        const filtered = airports.filter(airport =>
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase()) ||
          airport.name.toLowerCase().includes(value.toLowerCase())
        )
        setFromSuggestions(filtered)
        setShowFromSuggestions(true)
      } else {
        setShowFromSuggestions(false)
      }
    }

    if (name === 'to') {
      setSelectedToAirport(null)
      if (value.length > 0) {
        const filtered = airports.filter(airport =>
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase()) ||
          airport.name.toLowerCase().includes(value.toLowerCase())
        )
        setToSuggestions(filtered)
        setShowToSuggestions(true)
      } else {
        setShowToSuggestions(false)
      }
    }
  }

  const selectFromAirport = (airport) => {
    setFormData(prev => ({ ...prev, from: `${airport.city} (${airport.code})` }))
    setSelectedFromAirport(airport)
    setShowFromSuggestions(false)
    setErrors(prev => ({ ...prev, from: '' }))
  }

  const selectToAirport = (airport) => {
    setFormData(prev => ({ ...prev, to: `${airport.city} (${airport.code})` }))
    setSelectedToAirport(airport)
    setShowToSuggestions(false)
    setErrors(prev => ({ ...prev, to: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!selectedFromAirport) {
      newErrors.from = 'Please select a valid airport from the list'
    }
    if (!selectedToAirport) {
      newErrors.to = 'Please select a valid airport from the list'
    }
    if (selectedFromAirport && selectedToAirport && selectedFromAirport.code === selectedToAirport.code) {
      newErrors.to = 'Destination must be different from departure'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onBookingSubmit({
      ...formData,
      fromCode: selectedFromAirport.code,
      toCode: selectedToAirport.code
    })
  }

  return (
    <div className="booking-form">
      <h1>✈️ Airplane Air</h1>
      <h2>Book Your Flight</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="City or airport code"
            required
            autoComplete="off"
          />
          {errors.from && <span className="error-message">{errors.from}</span>}
          {showFromSuggestions && fromSuggestions.length > 0 && (
            <div className="airport-suggestions">
              {fromSuggestions.map(airport => (
                <div
                  key={airport.code}
                  className="airport-suggestion"
                  onClick={() => selectFromAirport(airport)}
                >
                  <div className="airport-suggestion-name">
                    {airport.city}, {airport.country}
                  </div>
                  <div className="airport-suggestion-code">
                    {airport.code} - {airport.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="to">To</label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="City or airport code"
            required
            autoComplete="off"
          />
          {errors.to && <span className="error-message">{errors.to}</span>}
          {showToSuggestions && toSuggestions.length > 0 && (
            <div className="airport-suggestions">
              {toSuggestions.map(airport => (
                <div
                  key={airport.code}
                  className="airport-suggestion"
                  onClick={() => selectToAirport(airport)}
                >
                  <div className="airport-suggestion-name">
                    {airport.city}, {airport.country}
                  </div>
                  <div className="airport-suggestion-code">
                    {airport.code} - {airport.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="departDate">Departure Date</label>
            <input
              type="date"
              id="departDate"
              name="departDate"
              value={formData.departDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="returnDate">Return Date (Optional)</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              min={formData.departDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="passengers">Passengers</label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              min="1"
              max="9"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="class">Class</label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            >
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary">Search Flights</button>
      </form>
    </div>
  )
}

export default BookingForm
