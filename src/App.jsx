import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  })
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setBookingConfirmed(true)
  }

  const resetForm = () => {
    setFormData({
      from: '',
      to: '',
      departDate: '',
      returnDate: '',
      passengers: 1,
      class: 'economy'
    })
    setBookingConfirmed(false)
  }

  if (bookingConfirmed) {
    return (
      <div className="container">
        <div className="confirmation">
          <h1>✈️ Booking Confirmed!</h1>
          <div className="confirmation-details">
            <h2>Your Flight Details</h2>
            <p><strong>From:</strong> {formData.from}</p>
            <p><strong>To:</strong> {formData.to}</p>
            <p><strong>Departure:</strong> {new Date(formData.departDate).toLocaleDateString()}</p>
            {formData.returnDate && <p><strong>Return:</strong> {new Date(formData.returnDate).toLocaleDateString()}</p>}
            <p><strong>Passengers:</strong> {formData.passengers}</p>
            <p><strong>Class:</strong> {formData.class.charAt(0).toUpperCase() + formData.class.slice(1)}</p>
          </div>
          <button onClick={resetForm} className="btn-primary">Book Another Flight</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
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
              placeholder="Departure city"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="to">To</label>
            <input
              type="text"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Destination city"
              required
            />
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
    </div>
  )
}

export default App
