const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email=? AND password=?',
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: 'Invalid login' });
      }

      const user = result[0];

      // 🔐 CREATE TOKEN
      const token = jwt.sign(
        { user_id: user.user_id },
        'secret123',   // later move to .env
        { expiresIn: '1h' }
      );

      res.json({ token });
    }
  );
});

module.exports = router;
