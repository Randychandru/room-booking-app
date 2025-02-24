import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';
import heroImage from '../Homepage.jpg';  // Import hero image
import meetingRoomImage from '../Vista.jpg'; // Import room images
import teamRoomImage from '../Matrix.jpg';
import trainingRoomImage from '../Huddle.jpg';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1>Find Your Space</h1>
          <h2>bookmyspace.in</h2>
          <p className="subtitle">Book modern, fully-equipped rooms for productive meetings, training sessions, and team collaborations.</p>
          <button
            className="cta-button"
            onClick={() => navigate('/book-room')}
          >
            Book Now <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-users"></i>
            <h3>Versatile Spaces</h3>
            <p>From boardroom meetings to collaborative workshops, we have the perfect room for every occasion.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-wifi"></i>
            <h3>High-Speed Connectivity</h3>
            <p>Reliable, lightning-fast WiFi ensures seamless presentations and virtual meetings.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-calendar-check"></i>
            <h3>Effortless Booking</h3>
            <p>Book your desired room instantly with our intuitive online platform and real-time availability.</p>
          </div>
        </div>
      </div>

      {/* Rooms Preview Section */}
      <div className="rooms-preview">
        <h2>Explore Our Spaces</h2>
        <div className="rooms-grid">
          <div className="room-card">
            <img src={meetingRoomImage} alt="Vista Conference Room" className="room-image" />
            <h3>Vista</h3>
            <p>A spacious and modern conference room, ideal for large meetings and presentations. Equipped with state-of-the-art technology.</p>
          </div>
          <div className="room-card">
            <img src={teamRoomImage} alt="Matrix Team Room" className="room-image" />
            <h3>Matrix</h3>
            <p>A collaborative space perfect for team discussions, brainstorming sessions, and project planning.</p>
          </div>
          <div className="room-card">
            <img src={trainingRoomImage} alt="Teknest Training Room" className="room-image" />
            <h3>Huddle</h3>
            <p>A dedicated training space equipped with interactive whiteboards, comfortable seating, and advanced audio-visual equipment.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Find the perfect room and book your space today!</p>
        <button
          className="cta-button"
          onClick={() => navigate('/book-room')}
        >
          Book Now <i className="fas fa-calendar-alt"></i>
        </button>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <p>© 2024 Room Booking System</p>
      </footer>
    </div>
  );
}

export default Home;