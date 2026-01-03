const express = require("express");
const router = express.Router();
const db = require("../db");

/* ADD STOP */
router.post("/add-stop", (req, res) => {
  const { trip_id, city_name, start_date, end_date } = req.body;

  if (!city_name || !trip_id) {
    return res.status(400).json({ message: "City and trip required" });
  }

  db.query(
    "INSERT INTO stops (trip_id, city_name, start_date, end_date) VALUES (?,?,?,?)",
    [trip_id, city_name, start_date, end_date],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ stop_id: result.insertId });
    }
  );
});

/* ADD ACTIVITY */
router.post("/add-activity", (req, res) => {
  const { stop_id, activity_name, cost } = req.body;

  if (!stop_id || !activity_name) {
    return res.status(400).json({ message: "Invalid activity data" });
  }

  db.query(
    "INSERT INTO activities (stop_id, activity_name, cost) VALUES (?,?,?)",
    [stop_id, activity_name, cost || 0],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Activity added" });
    }
  );
});

/* STOP BUDGET */
router.get("/stop-budget/:stopId", (req, res) => {
  db.query(
    "SELECT SUM(cost) AS budget FROM activities WHERE stop_id=?",
    [req.params.stopId],
    (err, result) => {
      res.json({ budget: result[0].budget || 0 });
    }
  );
});

module.exports = router;
