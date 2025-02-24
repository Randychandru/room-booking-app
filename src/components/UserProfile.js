import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/UserProfile.css';
import profileBackground from '../bookroom.jpg'; 

function UserProfile({ user }) {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    const loadBookings = useCallback((userId) => {
        try {
            const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            console.log('UserProfile - savedBookings:', savedBookings);

            // **ENSURE `userId` is a string**
            const userBookings = savedBookings.filter(booking => String(booking.userId) === String(userId));
            console.log('UserProfile - userBookings:', userBookings);
            setBookings(userBookings);
        } catch (err) {
            console.error("UserProfile - Error loading bookings:", err);
            setError("Failed to load bookings.");
        }
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        loadBookings(user.id);
    }, [user, navigate, loadBookings]);

    // Filter out past bookings
    const activeBookings = bookings.filter(booking => {
        const bookingDate = new Date(`${booking.date} ${booking.startTime}-${booking.endTime}`); // Ensure you use startTime
        return bookingDate >= new Date();
    });

      // Function to get the first name and last name from the user object
        const getDisplayName = (user) => {
            if (!user) return 'Unknown User'; // Handle case where user object is null/undefined
            return `${user.firstName || ''} ${user.lastName || ''}`.trim(); // Display the User
        };

    const handleCancelBooking = (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                const updatedBookings = savedBookings.filter(booking => booking.id !== bookingId);
                localStorage.setItem('bookings', JSON.stringify(updatedBookings));

                // Optimistically update the state
                setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
            } catch (err) {
                console.error("Error canceling booking:", err);
                setError("Failed to cancel booking. Please try again."); // User-friendly error message
            }
        }
    };

    return (
        <div className="profile-page" style={{ backgroundImage: `url(${profileBackground})` }}>
            <div className="container">
                {error && <div className="error-message">{error}</div>}

                <div className="profile-header">
                    <div className="user-avatar">
                        {user?.name?.charAt(0).toUpperCase() || user?.firstName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                        <h2>{getDisplayName(user)}</h2>
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
                        <p>No active confirmed bookings found. Time to book one!</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/book-room')}
                        >
                            <i className="fas fa-plus-circle"></i> Book a Room
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
                                    <i className="far fa-user"></i>
                                     <strong>Booked by:</strong> {booking.userName}
                                 </p>
                                  <p>
                                    <i className="far fa-comment"></i>
                                    <strong>Purpose:</strong> {booking.purpose}
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
        </div>
    );
}

export default UserProfile;