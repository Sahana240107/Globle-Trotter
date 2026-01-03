const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/trips', require('./routes/trips'));
app.use('/itinerary', require('./routes/itinerary'));

// Test route (optional)
app.get('/', (req, res) => {
  res.send('Globe Trotter Backend Running');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
