// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './components/styles/common.css';
import Navbar from './components/Navbar.js';
import Login from './components/Login.js';
import RoomBooking from './components/RoomBooking.js';
import Home from './components/Home.js';
import Register from './components/Register.js';
import UserProfile from './components/UserProfile.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if there's a user in session storage on initial load
    const storedAuth = sessionStorage.getItem('auth');
    return !!storedAuth;
  });
  const [user, setUser] = useState(() => {
    // Get the stored user from session storage on initial load
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
 useEffect(() => {
        if (isAuthenticated && user) {
            sessionStorage.setItem('auth', JSON.stringify(isAuthenticated))
            sessionStorage.setItem('user', JSON.stringify(user));
         
        } else {
            sessionStorage.removeItem('auth')
            sessionStorage.removeItem('user');
        }
    },
        [isAuthenticated, user]); 
  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/book-room"
              element={
                isAuthenticated ? (
                  <RoomBooking user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <UserProfile user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;