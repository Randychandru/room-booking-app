import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/RoomBooking.css';

function RoomBooking({ user }) {
  const navigate = useNavigate();

  const rooms = [
    { id: '101', name: 'Teknest', amenities: ['Projector', 'Whiteboard', 'Video Conference System', 'Air Conditioning'] },
    { id: '102', name: 'Matrix', amenities: ['Smart TV', 'Whiteboard', 'Coffee Machine'] },
    { id: '103', name: 'Huddle', amenities: ['Large Display', 'Sound System', 'Video Conference System', 'Premium Furniture'] },
    { id: '104', name: 'Vista', amenities: ['Multiple Displays', 'Whiteboard', 'Training Equipment'] },
    { id: '105', name: 'Director', amenities: ['Interactive Whiteboard', 'Flexible Seating', 'Brainstorming Tools'] }
  ];

  const timeSlots = [
    { start: '09:00 AM', end: '10:00 AM' },
    { start: '10:00 AM', end: '11:00 AM' },
    { start: '11:00 AM', end: '12:00 PM' },
    { start: '12:00 PM', end: '01:00 PM' },
    { start: '01:00 PM', end: '02:00 PM' },
    { start: '02:00 PM', end: '03:00 PM' },
    { start: '03:00 PM', end: '04:00 PM' },
    { start: '04:00 PM', end: '05:00 PM' },
    { start: '05:00 PM', end: '06:00 PM' }
  ];

  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    room: '',
    purpose: ''
  });

  const [bookings, setBookings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = savedBookings.filter(b => b.userId === user.id);
    setBookings(userBookings);
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.room || !bookingData.startTime || !bookingData.endTime) {
      return;
    }
    setIsLoading(true);
    setError(null);

    const selectedRoom = rooms.find(r => r.id === bookingData.room);
    const roomName = selectedRoom ? selectedRoom.name : bookingData.room;

      // Before creating the booking check local storage to avoid creating duplicate entry
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const conflictingBooking = existingBookings.find(booking =>
          booking.room === roomName &&
          booking.date === bookingData.date &&
          booking.startTime === bookingData.startTime
      );

      if (conflictingBooking) {
          alert('This room is already booked for the selected time slot. Please choose a different time.');
          setIsLoading(false);
          return;
      }


    try {
      const newBooking = {
        id: Date.now(),
        userId: user.id,
        room: roomName,
        date: bookingData.date,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        purpose: bookingData.purpose,
        bookingTime: new Date().toISOString()
      };

      const newBookingsList = [...existingBookings, newBooking];
      localStorage.setItem('bookings', JSON.stringify(newBookingsList));

      //Update only local storage for display
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const userBookings = savedBookings.filter(b => b.userId === user.id);
      setBookings(userBookings);

      setShowConfirmation(true);

      setBookingData({
        date: '',
        startTime: '',
        endTime: '',
        room: '',
        purpose: ''
      });

      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);

    } catch (err) {
      console.error('Booking error:', err);
      setError('Failed to book room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
        setShowConfirmation(true);

        setTimeout(() => {
            setShowConfirmation(false);
        }, 3000);
      } catch (err) {
        setError('Failed to cancel booking. Please try again.');
      }
    }
  };


  if (!user) {
    return (
      <div className="container">
        <div className="error-message">
          Please log in to book a room.
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {showConfirmation && (
        <div className="global-confirmation">
          <i className="fas fa-check-circle"></i>
          {bookings.length > 0 ? 'Room booked successfully!' : 'Booking cancelled successfully!'}

        </div>
      )}

      <div className="booking-container">
        <div className="card booking-form">
          <h2>Book a Room</h2>
          <p className="subtitle">Select your preferred room and time</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Select Room</label>
              <select
                name="room"
                className="form-control"
                value={bookingData.room}
                onChange={handleChange}
                required
              >
                <option value="">Choose a room</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            {bookingData.room && (
              <div className="room-details">
                <h4>Room Amenities</h4>
                <div className="amenities-list">
                  {rooms.find(r => r.id === bookingData.room)?.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">
                      <i className="fas fa-check"></i> {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={bookingData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Select Time Slot</label>
              <select
                name="timeSlot"
                className="form-control"
                value={bookingData.startTime ? `${bookingData.startTime}-${bookingData.endTime}` : ""}
                onChange={(e) => {
                  const [startTime, endTime] = e.target.value.split('-');
                  setBookingData(prev => ({
                    ...prev,
                    startTime,
                    endTime
                  }));
                }}
                required
              >
                <option value="">Choose a time slot</option>
                {timeSlots.map((slot, index) => {
                  const roomName = rooms.find(r => r.id === bookingData.room)?.name;
                  const isBooked = bookings.some(
                    booking =>
                      booking.date === bookingData.date &&
                      booking.startTime === slot.start &&
                      booking.room === roomName
                  );

                  return (
                    <option
                      key={index}
                      value={`${slot.start}-${slot.end}`}
                      disabled={isBooked}
                    >
                      {`${slot.start} - ${slot.end}`}
                    </option>
                  );
                })}
              </select>
            </div>


            <div className="form-group">
              <label className="form-label">Purpose</label>
              <textarea
                name="purpose"
                className="form-control"
                value={bookingData.purpose}
                onChange={handleChange}
                rows="3"
                placeholder="Enter the purpose of booking"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`btn btn-primary booking-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Booking...' : 'Book Room'}
            </button>
          </form>
        </div>

        <div className="card room-info">
          <h3>Your Bookings</h3>
          <div className="bookings-list">
            {bookings.length === 0 ? (
              <p className="no-bookings">
                <i className="far fa-calendar-times"></i>
                No bookings yet
              </p>
            ) : (
              bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h4>{booking.room}</h4>
                    <span className="booking-status">
                      <i className="fas fa-check-circle"></i> Confirmed
                    </span>
                  </div>
                  <div className="booking-body">
                    <p>
                      <i className="far fa-calendar"></i> <strong>Date:</strong> {booking.date}
                    </p>
                    <p>
                      <i className="far fa-clock"></i> <strong>Time:</strong> {booking.startTime} - {booking.endTime}
                    </p>
                    <p>
                      <i className="far fa-comment"></i> <strong>Purpose:</strong> {booking.purpose}
                    </p>
                  </div>
                  <div className="booking-footer">
                    <button
                      className="btn btn-danger cancel-btn"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <i className="fas fa-times"></i> Cancel Booking
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomBooking;