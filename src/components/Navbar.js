import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Navbar.css';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-calendar-check"></i>
          Room Booking
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <i className="fas fa-home"></i> Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/book-room" className="nav-link">
                <i className="fas fa-door-open"></i> Book Room
              </Link>
              <Link to="/profile" className="nav-link">
                <i className="fas fa-user"></i> Profile
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link to="/register" className="nav-link register-btn">
                <i className="fas fa-user-plus"></i> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;