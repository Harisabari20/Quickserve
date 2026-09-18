const db = require('../config/db');

const registerUser = async (req, res) => {
  try {
    const { name, fullName, email, phone, password } = req.body;
    const userName = name || fullName;

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

    const [existingUser] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const [result] = await db.query(
      `INSERT INTO users (name, email, phone, password)
       VALUES (?, ?, ?, ?)`,
      [userName, email, phone || null, password]
    );

    const user = {
      id: result.insertId,
      name: userName,
      email,
      phone: phone || null,
    };

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      userId: result.insertId,
      user,
    });
  } catch (error) {
    console.error('Registration error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const [rows] = await db.query(
      'SELECT id, name, email, phone FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const user = rows[0];

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};