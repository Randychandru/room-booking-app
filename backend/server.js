require('dotenv').config();  // Load environment variables

const mongoose = require('mongoose');
const express = require('express');  // Import express
const cors = require('cors');
const bookingSchema = require('./room.js');

const mongoURI = process.env.MONGO_URI; // Using process.env.MONGO_URI

const app = express();
const port = process.env.PORT || 5000

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON request bodies

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected Successfully!");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});
const Booking = mongoose.model('Booking', bookingSchema);

//API Functions can go here.
// Example function to load data, add, and delete.

// Start the function
app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        console.error("Error loading api", err)
        res.status(500).json({
            message: 'Failure to load bookings. Test is it is possible to retrieve information from the MongoDb server. Make sure the server is on'
        });
    }
});

// Create API list:

app.post('/bookings', async (req, res) => {
// All of these can return problems. Wrap with try catch and see where its coming from.
    try {
        const newBooking = new Booking(req.body);

        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
        console.log("Created new listing sucessfully in MongoDB",savedBooking)
        //Send to new API
    } catch (e) {
       console.error("Posting failed" +e);
        res.status(500).json({
         message: "Failed to create the data"
        });
    }
});
// You may need to remove this if it does not work as expected or does not exist in the project.
app.delete("api", async(req, res)=>{
  
})
//Now you need to listen!
app.listen(process.env.PORT || 5000, () => {
    console.log(`✅ API: Backend is running on port ${port}!`)

})