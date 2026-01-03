const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * Add a stop to a trip
 */
router.post('/add-stop', (req, res) => {
  const { trip_id, city_name, start_date, end_date } = req.body;

  if (!trip_id || !city_name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  db.query(
    'INSERT INTO stops (trip_id, city_name, start_date, end_date) VALUES (?,?,?,?)',
    [trip_id, city_name, start_date, end_date],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      res.json({ message: 'Stop added' });
    }
  );
});

/**
 * Add an activity to a stop
 */
router.post('/add-activity', (req, res) => {
  const { stop_id, activity_name, cost } = req.body;

  if (!stop_id || !activity_name || cost == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  db.query(
    'INSERT INTO activities (stop_id, activity_name, cost) VALUES (?,?,?)',
    [stop_id, activity_name, cost],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      res.json({ message: 'Activity added' });
    }
  );
});

/**
 * Calculate total trip budget
 */
router.get('/budget/:tripId', (req, res) => {
  db.query(
    `SELECT SUM(a.cost) AS total_cost
     FROM trips t
     JOIN stops s ON t.trip_id = s.trip_id
     JOIN activities a ON s.stop_id = a.stop_id
     WHERE t.trip_id = ?`,
    [req.params.tripId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      res.json({
        budget: result[0].total_cost || 0
      });
    }
  );
});

module.exports = router;
