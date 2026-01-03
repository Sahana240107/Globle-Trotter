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

router.post('/register', (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    city,
    country,
    password
  } = req.body;

  if (!email || !password || !first_name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  db.query(
    `INSERT INTO users
     (first_name, last_name, email, phone, city, country, password)
     VALUES (?,?,?,?,?,?,?)`,
    [first_name, last_name, email, phone, city, country, password],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Database error' });
      }

      res.json({
        message: 'User registered successfully',
        userId: result.insertId
      });
    }
  );
});


module.exports = router;