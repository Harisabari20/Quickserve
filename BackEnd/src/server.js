const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', authRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'QuickServe Backend is running!'
  });
});

// Test MySQL connection
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 AS result');

    res.json({
      success: true,
      message: 'MySQL is connected!',
      data: rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});