const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * Create a new trip
 */
router.post('/create', (req, res) => {
  const { user_id, trip_name, start_date, end_date } = req.body;

  if (!user_id || !trip_name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  db.query(
    'INSERT INTO trips (user_id, trip_name, start_date, end_date) VALUES (?,?,?,?)',
    [user_id, trip_name, start_date, end_date],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      res.json({
        message: 'Trip created',
        tripId: result.insertId
      });
    }
  );
});

/**
 * Get all trips for a user
 */
router.get('/:userId', (req, res) => {
  db.query(
    'SELECT * FROM trips WHERE user_id=?',
    [req.params.userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      res.json(result);
    }
  );
});

module.exports = router;
