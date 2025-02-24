import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Navbar.css'; // Ensure this path is correct

function Navbar({ isAuthenticated, setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('user'); // Also remove user from localStorage
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to="/" className="navbar-brand">
                        bookmyspace.in
                    </Link>
                </div>

                <div className="navbar-right">
                    <ul className="nav-items">
                        <li>
                            <Link to="/" className="nav-link"><i className="fas fa-home"></i> Home</Link>
                        </li>
                        {isAuthenticated && (
                            <>
                                <li>
                                    <Link to="/book-room" className="nav-link"><i className="fas fa-calendar-plus"></i> Book Room</Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="nav-link"><i className="fas fa-user"></i> Profile</Link>
                                </li>
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <li>
                                    <Link to="/login" className="nav-link"><i className="fas fa-sign-in-alt"></i> Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="nav-link"><i className="fas fa-user-plus"></i> Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {isAuthenticated && (
                        <button className="logout-button" onClick={handleLogout}> <i className="fas fa-sign-out-alt"></i> Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;