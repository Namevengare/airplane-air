import '../style/BookingConfirmation.css'

function BookingConfirmation({ bookingData, onNewBooking }) {
  const totalPrice = bookingData.selectedFlight.price * bookingData.passengers
  
  return (
    <div className="confirmation">
      <h1>✈️ Booking Confirmed!</h1>
      <div className="confirmation-details">
        <h2>Your Flight Details</h2>
        <p><strong>Flight:</strong> {bookingData.selectedFlight.id}</p>
        <p><strong>From:</strong> {bookingData.from}</p>
        <p><strong>To:</strong> {bookingData.to}</p>
        <p><strong>Departure:</strong> {new Date(bookingData.departDate).toLocaleDateString()} at {bookingData.selectedFlight.departureTime}</p>
        <p><strong>Arrival:</strong> {bookingData.selectedFlight.arrivalTime}</p>
        <p><strong>Duration:</strong> {bookingData.selectedFlight.duration}</p>
        {bookingData.returnDate && (
          <p><strong>Return:</strong> {new Date(bookingData.returnDate).toLocaleDateString()}</p>
        )}
        <p><strong>Passengers:</strong> {bookingData.passengers}</p>
        <p><strong>Class:</strong> {bookingData.class.charAt(0).toUpperCase() + bookingData.class.slice(1)}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
      </div>
      <button onClick={onNewBooking} className="btn-primary">Book Another Flight</button>
    </div>
  )
}

export default BookingConfirmation
