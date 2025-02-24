import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

const bookingService = {
  // Get all bookings for a user
  getUserBookings: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/bookings?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all bookings for a specific room
  getRoomBookings: async (roomId) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/room/${roomId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(`${API_URL}/bookings`, bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cancel a booking
  cancelBooking: async (bookingId) => {
    try {
      const response = await axios.delete(`${API_URL}/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check room availability
  checkAvailability: async (roomId, date, time) => {
    try {
      const response = await axios.get(
        `${API_URL}/bookings/check-availability?roomId=${roomId}&date=${date}&time=${time}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await axios.patch(`${API_URL}/bookings/${bookingId}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a booking
  deleteBooking: async (bookingId) => {
    try {
      const response = await axios.delete(`${API_URL}/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default bookingService;