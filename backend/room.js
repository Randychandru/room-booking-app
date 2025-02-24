const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    room: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    purpose: { type: String, required: true },
    bookingTime: { type: String, default: Date.now },
    confirmed: { type: Boolean, default: false },
    //This had the change
    autoCancelTime: { type: Number, default:0} // Time that it can be auto deleted in UNIX milliseconds
});