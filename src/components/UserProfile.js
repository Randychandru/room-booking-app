import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/UserProfile.css'; 

function UserProfile({ user }) {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = savedBookings.filter(booking => booking.userId === user.id);
    console.log('User Bookings:', userBookings); // Debugging log
    setBookings(userBookings);
  }, [user, navigate]);

  // Filter out past bookings
  const activeBookings = bookings.filter(booking => {
    const bookingDate = new Date(`${booking.date} ${booking.startTime}`); // Ensure you use startTime
    return bookingDate >= new Date();
  });

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = savedBookings.filter(booking => booking.id !== bookingId);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      
      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
    }
  };

  return (
    <div className="container">
      <div className="profile-header">
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="bookings-section">
          <h3>Your Room Bookings</h3>
          <div className="bookings-grid">
            {activeBookings.length === 0 ? (
              <div className="no-bookings-message">
                <i className="far fa-calendar-times"></i>
                <p>No active bookings found</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/book-room')}
                >
                  Book a Room
                </button>
              </div>
            ) : (
              activeBookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h4>{booking.room}</h4>
                    <span className="booking-status">
                      <i className="fas fa-check-circle"></i> Confirmed
                    </span>
                  </div>
                  
                  <div className="booking-details">
                    <p>
                      <i className="far fa-calendar"></i>
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p>
                      <i className="far fa-clock"></i>
                      <strong>Time:</strong> {booking.startTime} - {booking.endTime}
                    </p>
                    <p>
                      <i className="far fa-comment"></i>
                      <strong>Purpose:</strong> {booking.purpose}
                    </p>
                    <p className="booking-timestamp">
                      <i className="far fa-calendar-check"></i>
                      <strong>Booked on:</strong> {new Date(booking.bookingTime).toLocaleString()}
                    </p>
                  </div>

                  <div className="booking-actions">
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

export default UserProfile;