const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all rooms
router.get('/rooms', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rooms");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
