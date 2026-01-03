const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/create', (req, res) => {
  const { user_id, trip_name, start_date, end_date } = req.body;
  db.query(
    'INSERT INTO trips (user_id, trip_name, start_date, end_date) VALUES (?,?,?,?)',
    [user_id, trip_name, start_date, end_date],
    () => res.json({ message: 'Trip created' })
  );
});

router.get('/:userId', (req, res) => {
  db.query(
    'SELECT * FROM trips WHERE user_id=?',
    [req.params.userId],
    (err, result) => res.json(result)
  );
});

module.exports = router;
