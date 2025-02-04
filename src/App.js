import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/styles/common.css';
import Navbar from './components/Navbar.js';
import Login from './components/Login.js';
import RoomBooking from './components/RoomBooking.js';
import Home from './components/Home.js';
import Register from './components/Register.js';
import UserProfile from './components/UserProfile.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/book-room"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <RoomBooking user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UserProfile user={user} setUser={setUser} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
