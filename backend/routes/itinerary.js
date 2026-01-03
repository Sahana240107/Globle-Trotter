const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/add-stop', (req, res) => {
  const { trip_id, city_name, start_date, end_date } = req.body;
  db.query(
    'INSERT INTO stops (trip_id, city_name, start_date, end_date) VALUES (?,?,?,?)',
    [trip_id, city_name, start_date, end_date],
    () => res.json({ message: 'Stop added' })
  );
});

router.post('/add-activity', (req, res) => {
  const { stop_id, activity_name, cost } = req.body;
  db.query(
    'INSERT INTO activities (stop_id, activity_name, cost) VALUES (?,?,?)',
    [stop_id, activity_name, cost],
    () => res.json({ message: 'Activity added' })
  );
});

router.get('/budget/:tripId', (req, res) => {
  db.query(
    `SELECT SUM(a.cost) AS total_cost
     FROM trips t
     JOIN stops s ON t.trip_id=s.trip_id
     JOIN activities a ON s.stop_id=a.stop_id
     WHERE t.trip_id=?`,
    [req.params.tripId],
    (err, result) => res.json(result[0])
  );
});

module.exports = router;
