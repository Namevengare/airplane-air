import { useState } from 'react'
import './BookingForm.css'

function BookingForm({ onBookingSubmit }) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onBookingSubmit(formData)
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
  )
}

export default BookingForm
