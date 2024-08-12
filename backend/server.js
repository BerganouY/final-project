const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());

const pool = new Pool({
  user: 'yassine',
  host: 'localhost',
  database: 'mydb',
  password: 'yassine',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('Welcome to the Product API server');
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected successfully', time: result.rows[0].now });
  } catch (err) {
    console.error('Database connection error:', err.message);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});