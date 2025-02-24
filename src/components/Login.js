import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Login.css';
import officeMeetingImage from '../Huddle.jpg';

function Login({ setIsAuthenticated, setUser }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [bgOffset, setBgOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setBgOffset(window.scrollY * 0.2);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Simulate successful login
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Set user details
            setIsAuthenticated(true);
            setUser({
                id: 1,
                firstName: 'John',  // Use correct first name
                lastName: 'Doe',   // Use correct last name
                email: formData.email  // Use entered email
            });

            sessionStorage.setItem('user', JSON.stringify({
                id: 1,
                firstName: 'John',  // Use correct first name
                lastName: 'Doe',   // Use correct last name
                email: formData.email  // Use entered email
            }));

            navigate('/book-room');

        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="login-container"
            style={{
                backgroundImage: `url(${officeMeetingImage})`,
                backgroundPosition: `center ${bgOffset}px`,
                backgroundAttachment: 'fixed' // Parallax effect
            }}
        >
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back!</h2>
                    <p>Sign in to continue your room bookings</p>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <div className="input-wrapper">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-wrapper">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`login-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Logging in...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt"></i> Sign In
                            </>
                        )}
                    </button>
                </form>
                <div className="register-link">
                    Don't have an account? <Link to="/register">Join us</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;