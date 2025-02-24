import React, { useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/RoomBooking.css';
import backgroundImage from '../bookroom.jpg';

function RoomBooking({ user }) {
    const navigate = useNavigate();

    const rooms = [
        { id: '101', name: 'Matrix' },
        { id: '102', name: 'Huddle' },
        { id: '103', name: 'Vista' },
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
    const [timers, setTimers] = useState({});

    const loadBookings = useCallback(() => {
        try {
            const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            console.log("RoomBooking - savedBookings:", savedBookings);
            setBookings(savedBookings);
        } catch (err) {
            console.error("RoomBooking - Error loading bookings:", err);
            setError("Failed to load bookings.");
            setBookings([]);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        loadBookings();
    }, [user, navigate, loadBookings]);

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
            setError("Please fill in all required fields.");
            return;
        }

        const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] ?([AP]M)?$/i;
        if (!timeRegex.test(bookingData.startTime) || !timeRegex.test(bookingData.endTime)) {
            setError("Invalid time format. Please use HH:MM or HH:MM AM/PM.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const selectedRoom = rooms.find(r => r.id === bookingData.room);
        const roomName = selectedRoom ? selectedRoom.name : bookingData.room;

        try {
            const newBooking = {
                id: Date.now().toString(), // Convert to string for consistency
                userId: String(user.id),
                userName: user.name,
                room: roomName,
                date: bookingData.date,
                startTime: bookingData.startTime,
                endTime: bookingData.endTime,
                purpose: bookingData.purpose,
                bookingTime: new Date().toISOString(),
                confirmed: false,
                confirmationTime: null
            };

            const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            const newBookingsList = [...existingBookings, newBooking];
            localStorage.setItem('bookings', JSON.stringify(newBookingsList));

            setBookings(newBookingsList);
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

    const confirmBooking = (bookingId) => {
        try {
            const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            
            const updatedBookings = allBookings.map(booking => {
                if (booking.id === bookingId) {
                    return {
                        ...booking,
                        confirmed: true,
                        confirmationTime: new Date().toISOString()
                    };
                }
                return booking;
            });

            localStorage.setItem('bookings', JSON.stringify(updatedBookings));
            setBookings(updatedBookings);

            console.log(`Booking ${bookingId} confirmed successfully`);
            
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 3000);

        } catch (err) {
            console.error('Error confirming booking:', err);
            setError('Failed to confirm booking. Please try again.');
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

    const userBookings = bookings.filter(booking => String(booking.userId) === String(user.id));

    return (
        <div className="booking-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="container">
                {error && <div className="error-message">{error}</div>}

                {showConfirmation && (
                    <div className="global-confirmation">
                        <i className="fas fa-check-circle"></i>
                        Booking action completed successfully!
                    </div>
                )}

                <div className="booking-container">
                    <div className="card booking-form">
                        <h2>Book a Room</h2>
                        <p className="subtitle">Enter your room and time preferences</p>

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
                                <label className="form-label">Start Time</label>
                                <input
                                    type="text"
                                    name="startTime"
                                    className="form-control"
                                    value={bookingData.startTime}
                                    onChange={handleChange}
                                    placeholder="HH:MM AM/PM"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">End Time</label>
                                <input
                                    type="text"
                                    name="endTime"
                                    className="form-control"
                                    value={bookingData.endTime}
                                    onChange={handleChange}
                                    placeholder="HH:MM AM/PM"
                                    required
                                />
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
                            {userBookings.length === 0 ? (
                                <p className="no-bookings">
                                    <i className="far fa-calendar-times"></i>
                                    No bookings yet
                                </p>
                            ) : (
                                userBookings.map(booking => (
                                    <div key={booking.id} className={`booking-card ${booking.confirmed ? 'confirmed' : ''}`}>
                                        <div className="booking-header">
                                            <h4>
                                                {booking.room}
                                                <span className={`booking-status ${booking.confirmed ? 'confirmed' : 'pending'}`}>
                                                    {booking.confirmed ? ' (Confirmed)' : ' (Pending)'}
                                                </span>
                                            </h4>
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
                                            {booking.confirmationTime && (
                                                <p className="confirmation-time">
                                                    <i className="far fa-check-circle"></i> <strong>Confirmed at:</strong>{' '}
                                                    {new Date(booking.confirmationTime).toLocaleString()}
                                                </p>
                                            )}
                                        </div>

                                        <div className="booking-actions">
                                            {!booking.confirmed && (
                                                <button
                                                    className="btn btn-success confirm-btn"
                                                    onClick={() => confirmBooking(booking.id)}
                                                >
                                                    Confirm Use
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-danger cancel-btn"
                                                onClick={() => handleCancelBooking(booking.id)}
                                            >
                                                Cancel Booking
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

export default RoomBooking;