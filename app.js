const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Import the PostgreSQL client

const app = express();
const port = 3000;

// Enable CORS for all origins or configure specific origins
app.use(cors()); // Allows all origins by default

// Middleware to parse JSON requests
app.use(express.json());

// PostgreSQL connection configuration
const db = new Pool({
  host: 'postgresql://root:RsLIbAbpc1wx9BOnropnFYLh1GSvbAeG@dpg-cspmqelumphs73d5a77g-a.oregon-postgres.render.com/devansh',
  user: 'root',       // PostgreSQL username
  password: 'RsLIbAbpc1wx9BOnropnFYLh1GSvbAeG',       // PostgreSQL password
  database: 'devansh',    // Database name
  port: 5432              // Default PostgreSQL port
});

// Connect to PostgreSQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
    return;
  }
  console.log('Connected to the PostgreSQL database.');
  console.log('Welcome to Devansh Web Server....');
});

// API endpoint to insert a student record
app.post('/add-student', async (req, res) => {
  const { enrollNo, name, marks, age } = req.body;
  console.log('Enrollment No:', enrollNo);
  console.log('Name:', name);
  console.log('Marks:', marks);
  console.log('Age:', age);
  
  if (!enrollNo || !name || !marks || !age) {
    return res.status(400).json({ error: 'Please provide enrollNo, name, marks, and age.' });
  }

  const query = 'INSERT INTO student (student_id, student_name, marks, age) VALUES ($1, $2, $3, $4) RETURNING student_id';
  try {
    const result = await db.query(query, [enrollNo, name, marks, age]);
    console.log('Student record added in PostgreSQL Database');
    res.status(201).json({ message: 'Student record added successfully.', studentId: result.rows[0].student_id });
  } catch (err) {
    console.error('Error inserting data:', err.message);
    res.status(500).json({ error: 'Database error.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
