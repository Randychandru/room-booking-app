import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Room Booking System</h1>
        <p className="subtitle">Book your perfect meeting space in seconds</p>
        <button 
          className="cta-button"
          onClick={() => navigate('/book-room')}
        >
          Book Now
        </button>
      </div>

      <div className="features-section">
        <h2>Why Choose Our Rooms?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-video"></i>
            <h3>Meeting room</h3>
            <p>Reserved Space: Your Meeting, Your Moment.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-wifi"></i>
            <h3>High-Speed WiFi</h3>
            <p>Reliable internet connection for seamless meetings</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-clock"></i>
            <h3>Instant Booking</h3>
            <p>Book your room instantly with real-time availability</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-coffee"></i>
            <h3>Premium Amenities</h3>
            <p>Access to kitchen, coffee, and refreshments</p>
          </div>
        </div>
      </div>

      <div className="rooms-preview">
        <h2>Our Spaces</h2>
        <div className="rooms-grid">
          <div className="room-card">
            <div className="room-image conference-room"></div>
            <h3>Vista</h3>
            <p>Perfect for large meetings and presentations</p>
          </div>
          <div className="room-card">
            <div className="room-image meeting-room"></div>
            <h3>Matrix</h3>
            <p>Ideal for small team discussions</p>
          </div>
          <div className="room-card">
            <div className="room-image training-room"></div>
            <h3>Teknest</h3>
            <p>Equipped for workshops and training sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;