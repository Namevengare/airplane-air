import './BookingConfirmation.css'

function BookingConfirmation({ bookingData, onNewBooking }) {
  return (
    <div className="confirmation">
      <h1>✈️ Booking Confirmed!</h1>
      <div className="confirmation-details">
        <h2>Your Flight Details</h2>
        <p><strong>From:</strong> {bookingData.from}</p>
        <p><strong>To:</strong> {bookingData.to}</p>
        <p><strong>Departure:</strong> {new Date(bookingData.departDate).toLocaleDateString()}</p>
        {bookingData.returnDate && (
          <p><strong>Return:</strong> {new Date(bookingData.returnDate).toLocaleDateString()}</p>
        )}
        <p><strong>Passengers:</strong> {bookingData.passengers}</p>
        <p><strong>Class:</strong> {bookingData.class.charAt(0).toUpperCase() + bookingData.class.slice(1)}</p>
      </div>
      <button onClick={onNewBooking} className="btn-primary">Book Another Flight</button>
    </div>
  )
}

export default BookingConfirmation
